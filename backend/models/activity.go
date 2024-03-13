package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Activity struct {
	Description  string             `bson:"Description,omitempty"`
	ImageURI     string             `bson:"ImageURI,omitempty"`
	Date         primitive.DateTime `bson:"Date,omitempty"`
	Address      string             `bson:"Address,omitempty"`
	Coordinate   string             `bson:"Coordinate,omitempty"`
	IsMapBased   bool               `bson:"IsMapBased,omitempty"`
	LocationName string             `bson:"LocationName,omitempty"`
}
