package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Profile struct {
	// Fields for actual Profile document in database
	DisplayName string             `bson:"DisplayName,omitempty"`
	Joined      primitive.DateTime `bson:"Joined,omitempty"`
}
