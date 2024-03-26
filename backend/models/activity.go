package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Activity struct {
	// Fields for actual Activity document in database
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	ParentTripID primitive.ObjectID `bson:"ParentTripID,omitempty"`
	Description  string             `bson:"Description,omitempty"`
	Date         primitive.DateTime `bson:"Date,omitempty"`
	ImageURI     string             `bson:"ImageURI,omitempty"`
	IsMapBased   bool               `bson:"IsMapBased,omitempty"`
	LocationName string             `bson:"LocationName,omitempty"`
	Address      string             `bson:"Address,omitempty"`
	Coordinate   string             `bson:"Coordinate,omitempty"`
}

func (a *Activity) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*a = Activity{}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("activity does not exist")
	}

	// Acquire value and validity of Activity fields from result
	var idOK, parentTripOK, descriptionOK, dateOK, imageOK, isMapBasedOK, locationNameOK, addressOK, coordinateOK bool

	a.ID, idOK = result["_id"].(primitive.ObjectID)
	a.ParentTripID, parentTripOK = result["ParentTripID"].(primitive.ObjectID)
	a.Description, descriptionOK = result["Description"].(string)
	a.Date, dateOK = result["Date"].(primitive.DateTime)
	a.ImageURI, imageOK = result["ImageURI"].(string)
	a.IsMapBased, isMapBasedOK = result["IsMapBased"].(bool)
	a.LocationName, locationNameOK = result["LocationName"].(string)
	a.Address, addressOK = result["Address"].(string)
	a.Coordinate, coordinateOK = result["Coordinate"].(string)

	checklist := []bool{idOK, parentTripOK, descriptionOK, dateOK, imageOK, isMapBasedOK, locationNameOK, addressOK, coordinateOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to activity")
	}

	return nil
}

func (a *Activity) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*a = Activity{}

	result, err := coll.FindDocument(filter, "Activity")

	if err != nil {
		return errors.New("activity does not exist")
	}

	if activityRes, ok := result.(*Activity); ok {
		a = activityRes
		return nil
	}

	return errors.New("Failed to convert model to Activity.")
}

func (a *Activity) GetKeys() []string {
	return []string{
		"ID", "ParentTripID", "Description", "Date", "ImageURI", "IsMapBased", "Address",
		"Coordinate",
	}
}

func (a *Activity) GetValue(key string) (any, error) {
	switch key {
	case "ID":
		return a.ID, nil
	case "ParentTripID":
		return a.ParentTripID, nil
	case "Description":
		return a.Description, nil
	case "Date":
		return a.Date, nil
	case "ImageURI":
		return a.ImageURI, nil
	case "IsMapBased":
		return a.IsMapBased, nil
	case "Address":
		return a.Address, nil
	case "Coordinate":
		return a.Coordinate, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (a *Activity) SetValue(key string, value any) error {
	switch key {
	case "ID":
		if ID, ok := value.(primitive.ObjectID); ok {
			a.ID = ID
			return nil
		}

		return errors.New("Failed to convert value to ObjectID.")
	case "ParentTripID":
		if ParentTripID, ok := value.(primitive.ObjectID); ok {
			a.ParentTripID = ParentTripID
			return nil
		}

		return errors.New("Failed to convert value to ObjectID.")
	case "Description":
		if Description, ok := value.(string); ok {
			a.Description = Description
			return nil
		}

		return errors.New("Failed to convert value to string.")
	case "Date":
		if Date, ok := value.(primitive.DateTime); ok {
			a.Date = Date
			return nil
		}

		return errors.New("Failed to convert value to DateTime.")
	case "ImageURI":
		if ImageURI, ok := value.(string); ok {
			a.ImageURI = ImageURI
			return nil
		}

		return errors.New("Failed to convert value to string.")
	case "IsMapBased":
		if IsMapBased, ok := value.(bool); ok {
			a.IsMapBased = IsMapBased
			return nil
		}

		return errors.New("Failed to convert value to bool.")
	case "Address":
		if Address, ok := value.(string); ok {
			a.Address = Address
			return nil
		}

		return errors.New("Failed to convert value to string.")
	case "Coordinate":
		if Coordinate, ok := value.(string); ok {
			a.Coordinate = Coordinate
			return nil
		}

		return errors.New("Failed to convert value to string.")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
