package models

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var countLHS uint64 = 0
var countRHS uint64 = 0

type MockCollection struct {
	Collection map[primitive.ObjectID]map[string]any
}

func (mc *MockCollection) NewID() primitive.ObjectID {
	bytes := [12]byte{}

	for i := 0; i < 8; i++ {
		bytes[i] = byte(countRHS >> uint64(8*i) & 0xFF)
	}

	for i := 8; i < 12; i++ {
		bytes[i] = byte(countLHS >> uint64(8*i) & 0xFF)
	}

	countRHS++

	if countRHS == 0 {
		countLHS++
	}

	id := primitive.ObjectID(bytes)

	return id
}

func (mc *MockCollection) InsertDocument(m Model, modelType string) (Model, error) {
	// Acquire keys for document fields to be stored in collection
	keys := m.GetKeys()

	// Create ID for new document
	id := mc.NewID()

	err := m.SetValue("_id", id)

	if err != nil {
		return nil, err
	}

	// Create placeholder entry in collection
	mc.Collection[id] = make(map[string]any)

	// Place document into collection
	for _, key := range keys {
		value, err := m.GetValue(key)

		if err != nil {
			return nil, err
		}

		mc.Collection[id][key] = value
	}

	return m, nil
}

func (mc *MockCollection) UpdateDocument(filter bson.M, content bson.M, modelType string) (Model, error) {
	// Find the entry in the collection
	result, err := mc.FindDocument(filter, modelType)

	if err != nil {
		return nil, err
	}

	// Acquire the document's ID
	tmp, err := result.GetValue("ID")

	if err != nil {
		return nil, err
	}

	objectID, ok := tmp.(primitive.ObjectID)

	if !ok {
		return nil, errors.New("Failed to convert ID to ObjectID.")
	}

	// Update the entry in the collection
	for key, value := range content {
		mc.Collection[objectID][key] = value

		if err := result.SetValue(key, value); err != nil {
			return nil, err
		}
	}

	return result, nil
}

func (mc *MockCollection) FindDocument(filter bson.M, modelType string) (Model, error) {
	// Find the entry in the collection
	found, objectID := false, primitive.ObjectID{}

	for id, entry := range mc.Collection {
		matching := true

		for key, value := range filter {
			if entry[key] != value {
				matching = false
				break
			}
		}

		if matching {
			found, objectID = true, id
			break
		}
	}

	if !found {
		return nil, errors.New("Unable to find document.")
	}

	factory, ok := ModelFactories[modelType]

	if !ok {
		return nil, errors.New("Invalid model type: '" + modelType + "'.")
	}

	result := factory()

	// Populate model with field values
	for key, value := range mc.Collection[objectID] {
		if err := result.SetValue(key, value); err != nil {
			return nil, err
		}
	}

	return result, nil
}

func (mc *MockCollection) DeleteDocument(filter bson.M, modelType string) error {
	// Find the entry in the collection
	result, err := mc.FindDocument(filter, modelType)

	if err != nil {
		return err
	}

	// Acquire the document's ID
	tmp, err := result.GetValue("_id")

	if err != nil {
		return err
	}

	objectID, ok := tmp.(primitive.ObjectID)

	if !ok {
		return errors.New("Failed to convert ID to ObjectID.")
	}

	// Remove document from collection
	delete(mc.Collection, objectID)

	return nil
}
