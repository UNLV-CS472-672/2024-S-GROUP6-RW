package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	// Fields for actual User document in database
	ProfileID  primitive.ObjectID   `bson:"ProfileID,omitempty"`
	TripIDs    []primitive.ObjectID `bson:"TripIDs,omitempty"`
	FriendIDs  []primitive.ObjectID `bson:"FriendIDs,omitempty"`
	Username   string               `bson:"Username,omitempty"`
	PassHash   string               `bson:"PassHash,omitempty"`
	Email      string               `bson:"Email,omitempty"`
	InvoiceIDs []primitive.ObjectID `bson:"InvoiceIDs,omitempty"`
	LastLogin  primitive.DateTime   `bson:"LastLogin,omitempty"`

	// Placeholder fields for user entry point data
	FirstName string
	LastName  string
	Password  string
}
