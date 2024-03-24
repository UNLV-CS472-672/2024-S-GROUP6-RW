package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProfileModification struct {
	// Fields to bind from profile modification request
	FieldName string      `json:"FieldName"`
	Date      interface{} `json:"Data"`
}

type Profile struct {
	// Fields for actual Profile document in database
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Username    string             `bson:"Username,omitempty"`
	DisplayName string             `bson:"DisplayName,omitempty"`
	Joined      primitive.DateTime `bson:"Joined,omitempty"`
	About       string             `bson:"About,omitempty"`

	// Placeholder fields for HTTP request body information not stored to Profile database
	Modifications []ProfileModification
}

func (p *Profile) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*p = Profile{}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("profile does not exist")
	}

	// Acquire value and validity of Profile fields from result
	var idOK, usernameOK, displayNameOK, joinedOK, aboutOK bool

	p.ID, idOK = result["_id"].(primitive.ObjectID)
	p.Username, usernameOK = result["Username"].(string)
	p.DisplayName, displayNameOK = result["DisplayName"].(string)
	p.Joined, joinedOK = result["Joined"].(primitive.DateTime)
	p.About, aboutOK = result["About"].(string)

	checklist := []bool{idOK, usernameOK, displayNameOK, joinedOK, aboutOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to profile")
	}

	return nil
}
