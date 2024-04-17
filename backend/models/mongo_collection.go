package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoCollection struct {
	Collection *mongo.Collection
}

func (mc *MongoCollection) InsertDocument(m Model, modelType string) (Model, error) {
	// Acquire keys for document fields to be stored in collection
	keys := m.GetKeys()

	// Create document to insert from fields in model
	content := bson.M{}

	for _, key := range keys {
		value, err := m.GetValue(key)

		if err != nil {
			return nil, err
		}

		if key != "_id" {
			content[key] = value
		}
	}

	// Attempt to insert document into collection
	InsertResult, err := mc.Collection.InsertOne(context.TODO(), content)

	if err != nil {
		return nil, err
	}

	factory, ok := ModelFactories[modelType]

	if !ok {
		return nil, errors.New("Invalid model type: '" + modelType + "'.")
	}

	// Acquire document from collection
	result := factory()

	if err := result.GetMongoDocument(mc, bson.M{"_id": InsertResult.InsertedID}); err != nil {
		return nil, err
	}

	return result, nil
}

func (mc *MongoCollection) UpdateDocument(filter bson.M, content bson.M, modelType string) (Model, error) {
	// Attempt to update document in collection
	UpdateResult := mc.Collection.FindOneAndUpdate(context.TODO(), filter, bson.M{"$set": content})

	if UpdateResult.Err() != nil {
		return nil, UpdateResult.Err()
	}

	factory, ok := ModelFactories[modelType]

	if !ok {
		return nil, errors.New("Invalid model type: '" + modelType + "'.")
	}

	// Acquire document from collection
	var document bson.M

	err := UpdateResult.Decode(&document)

	if err != nil {
		return nil, err
	}

	result := factory()

	if err := result.GetMongoDocument(mc, bson.M{"_id": document["_id"]}); err != nil {
		return nil, err
	}

	return result, nil
}

func (mc *MongoCollection) FindDocument(filter bson.M, modelType string) (Model, error) {
	factory, ok := ModelFactories[modelType]

	if !ok {
		return nil, errors.New("Invalid model type: '" + modelType + "'.")
	}

	// Acquire document from collection
	result := factory()

	if err := result.GetMongoDocument(mc, filter); err != nil {
		return nil, err
	}

	return result, nil
}

func (mc *MongoCollection) DeleteDocument(filter bson.M, modelType string) error {
	// Attempt to delete document from collection
	_, err := mc.Collection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return err
	}

	return nil
}
