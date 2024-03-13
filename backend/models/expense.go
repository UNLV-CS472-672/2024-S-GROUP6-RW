package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Expense struct {
	// Fields for actual Expense document in database
	Description      string               `bson:"Description,omitempty"`
	Amount           float64              `bson:"Amount,omitempty"`
	InvoiceIDs       []primitive.ObjectID `bson:"InvoiceIDs,omitempty"`
	IsPaid           bool                 `bson:"IsPaid,omitempty"`
	RemainingBalance float64              `bson:"RemainingBalance,omitempty"`
}
