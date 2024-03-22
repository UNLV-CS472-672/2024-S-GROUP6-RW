package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Expense struct {
	// Fields for actual Expense document in database
	ID               primitive.ObjectID   `bson:"_id,omitempty"`
	ParentTripID     primitive.ObjectID   `bson:"ParentTripID,omitempty"`
	Description      string               `bson:"Description,omitempty"`
	Amount           float64              `bson:"Amount,omitempty"`
	InvoiceIDs       []primitive.ObjectID `bson:"InvoiceIDs,omitempty"`
	RemainingBalance float64              `bson:"RemainingBalance,omitempty"`
	IsPaid           bool                 `bson:"IsPaid,omitempty"`
}

func (e *Expense) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*e = Expense{}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("expense does not exist")
	}

	// Acquire value and validity of Expense fields from result
	var idOK, parentTripOK, descriptionOK, amountOK, invoicesOK, remainingBalanceOK, isPaidOK bool
	var invoiceList primitive.A
	var id primitive.ObjectID

	e.ID, idOK = result["_id"].(primitive.ObjectID)
	e.ParentTripID, parentTripOK = result["ParentTripID"].(primitive.ObjectID)
	e.Description, descriptionOK = result["Description"].(string)
	e.Amount, amountOK = result["Amount"].(float64)
	invoiceList, invoicesOK = result["InvoiceIDs"].(primitive.A)
	e.RemainingBalance, remainingBalanceOK = result["RemainingBalance"].(float64)
	e.IsPaid, isPaidOK = result["IsPaid"].(bool)

	type converter struct {
		flag   *bool
		source *primitive.A
		dest   *[]primitive.ObjectID
	}

	idConverter := []converter{
		{&invoicesOK, &invoiceList, &e.InvoiceIDs},
	}

	for i := range idConverter {
		// Get a pointer to the original converter instance
		cvt := &idConverter[i]

		for i := 0; *cvt.flag && i < len(*cvt.source); i++ {
			id, *cvt.flag = (*cvt.source)[i].(primitive.ObjectID)

			if *cvt.flag {
				*cvt.dest = append(*cvt.dest, id)
			}
		}
	}

	checklist := []bool{idOK, parentTripOK, descriptionOK, amountOK, invoicesOK, remainingBalanceOK, isPaidOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to expense")
	}

	return nil
}
