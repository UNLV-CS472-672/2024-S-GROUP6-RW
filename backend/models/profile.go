package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Profile struct {
	// Fields for actual Profile document in database
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	UserID      primitive.ObjectID `bson:"UserID,omitempty"`
	DisplayName string             `bson:"DisplayName,omitempty"`
	Joined      primitive.DateTime `bson:"Joined,omitempty"`
}

func (p *Profile) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*p = Profile{}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("Profile does not exist.")
	}

	// Acquire value and validity of Trip fields from result
	var idOK, userOK, displayNameOK, joinedOK bool

	p.ID, idOK = result["_id"].(primitive.ObjectID)
	p.UserID, userOK = result["UserID"].(primitive.ObjectID)
	p.DisplayName, displayNameOK = result["DisplayName"].(string)
	p.Joined, joinedOK = result["Joined"].(primitive.DateTime)

	checklist := []bool{idOK, userOK, displayNameOK, joinedOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("Failed to convert result to Profile.")
	}

	return nil
}
