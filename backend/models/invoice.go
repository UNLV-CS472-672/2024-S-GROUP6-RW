package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Invoice struct {
	_id         primitive.ObjectID `bson:"_id,omitempty"`
	PayeeID     primitive.ObjectID `bson:"PayeeID,omitempty"`
	Balance     double             `bson:"Balance,omitempty"`
	Description string             `bson:"Description,omitempty"`
}
