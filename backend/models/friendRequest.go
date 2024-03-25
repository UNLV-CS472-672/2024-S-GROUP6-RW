package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type FriendRequest struct {
	// Fields for actual FriendRequest document in database
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	SenderID primitive.ObjectID `bson:"SenderID,omitempty"`
	TargetID primitive.ObjectID `bson:"TargetID,omitempty"`

	// Placeholder fields for friend reequest entry point data
	SenderUsername string
	TargetUsername string
	AcceptRequest  bool
}

func (f *FriendRequest) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*f = FriendRequest{
		SenderUsername: f.SenderUsername,
		TargetUsername: f.TargetUsername,
		AcceptRequest:  f.AcceptRequest,
	}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("friend request does not exist")
	}

	// Acquire value and validity of FriendRequest fields from result
	var idOK, senderOK, targetOK bool

	f.ID, idOK = result["_id"].(primitive.ObjectID)
	f.SenderID, senderOK = result["SenderID"].(primitive.ObjectID)
	f.TargetID, targetOK = result["TargetID"].(primitive.ObjectID)

	checklist := []bool{idOK, senderOK, targetOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to friend request")
	}

	return nil
}
