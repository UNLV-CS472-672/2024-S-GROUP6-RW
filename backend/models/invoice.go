package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Invoice struct {
	// Fields for actual Invoice document in database
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	ParentExpenseID primitive.ObjectID `bson:"ParentExpenseID,omitempty"`
	PayeeID         primitive.ObjectID `bson:"PayeeID,omitempty"`
	Description     string             `bson:"Description,omitempty"`
	Balance         float64            `bson:"Balance,omitempty"`
}

func (i *Invoice) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*i = Invoice{}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("invoice does not exist")
	}

	// Acquire value and validity of Invoice fields from result
	var idOK, parentExpenseOK, payeeOK, descriptionOK, balanceOK bool

	i.ID, idOK = result["_id"].(primitive.ObjectID)
	i.ParentExpenseID, parentExpenseOK = result["ParentExpenseID"].(primitive.ObjectID)
	i.PayeeID, payeeOK = result["PayeeID"].(primitive.ObjectID)
	i.Description, descriptionOK = result["Description"].(string)
	i.Balance, balanceOK = result["Balance"].(float64)

	checklist := []bool{idOK, parentExpenseOK, payeeOK, descriptionOK, balanceOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to invoice")
	}

	return nil
}
