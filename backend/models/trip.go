package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Trip struct {
	TripOwnerID  primitive.ObjectID `bson:"TripOwnerID,omitempty"`
	Username     string
	LocationName string               `bson:"LocationName,omitempty"`
	ActivityIDs  []primitive.ObjectID `bson:"ActivityIDs,omitempty"`
	MemberIDs    []primitive.ObjectID `bson:"MemberIDs,omitempty"`
	ExpenseIDs   []primitive.ObjectID `bson:"ExpenseIDs,omitempty"`
}
