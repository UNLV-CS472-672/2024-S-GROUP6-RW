package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Profile struct {
	_id         primitive.ObjectID `bson:"_id,omitempty"`
	DisplayName string             `bson:"DisplayName,omitempty"`
	Joined      primitive.DateTime `bson:"Joined,omitempty"`
}
