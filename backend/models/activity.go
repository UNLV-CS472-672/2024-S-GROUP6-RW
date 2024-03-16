package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func (a *Activity) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*a = Activity{}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("Activity does not exist.")
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
		return errors.New("Failed to convert result to Activity.")
	}

	return nil
}
