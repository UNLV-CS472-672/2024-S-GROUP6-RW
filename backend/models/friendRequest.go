package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (f *FriendRequest) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*f = FriendRequest{
		SenderUsername: f.SenderUsername,
		TargetUsername: f.TargetUsername,
		AcceptRequest:  f.AcceptRequest,
	}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

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

func (f *FriendRequest) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*f = FriendRequest{
		SenderUsername: f.SenderUsername,
		TargetUsername: f.TargetUsername,
		AcceptRequest:  f.AcceptRequest,
	}

	result, err := coll.FindDocument(filter, "FriendRequest")

	if err != nil {
		return errors.New("friend request does not exist")
	}

	err = result.SetValue("SenderUsername", f.SenderUsername)

	if err != nil {
		return err
	}

	err = result.SetValue("TargetUsername", f.TargetUsername)

	if err != nil {
		return err
	}

	err = result.SetValue("AcceptRequest", f.AcceptRequest)

	if err != nil {
		return err
	}

	if requestRes, ok := result.(*FriendRequest); ok {
		*f = *requestRes
		return nil
	}

	return errors.New("failed to convert model to FriendRequest")
}

func (f *FriendRequest) GetKeys() []string {
	return []string{
		"_id", "SenderID", "TargetID",
	}
}

func (f *FriendRequest) GetValue(key string) (any, error) {
	switch key {
	case "_id":
		return f.ID, nil
	case "SenderID":
		return f.SenderID, nil
	case "TargetID":
		return f.TargetID, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (f *FriendRequest) SetValue(key string, value any) error {
	switch key {
	case "_id":
		if ID, ok := value.(primitive.ObjectID); ok {
			f.ID = ID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "SenderID":
		if SenderID, ok := value.(primitive.ObjectID); ok {
			f.SenderID = SenderID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "TargetID":
		if TargetID, ok := value.(primitive.ObjectID); ok {
			f.TargetID = TargetID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
