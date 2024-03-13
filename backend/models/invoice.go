package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Invoice struct {
	// Fields for actual Invoice document in database
	PayeeID     primitive.ObjectID `bson:"PayeeID,omitempty"`
	Balance     float64            `bson:"Balance,omitempty"`
	Description string             `bson:"Description,omitempty"`
}
