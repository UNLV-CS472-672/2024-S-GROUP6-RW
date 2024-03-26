package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Invoice struct {
	// Fields for actual Invoice document in database
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	ParentExpenseID primitive.ObjectID `bson:"ParentExpenseID,omitempty"`
	PayeeID         primitive.ObjectID `bson:"PayeeID,omitempty"`
	Description     string             `bson:"Description,omitempty"`
	Balance         float64            `bson:"Balance,omitempty"`
}

func (i *Invoice) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*i = Invoice{}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

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

func (i *Invoice) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*i = Invoice{}

	result, err := coll.FindDocument(filter, "Invoice")

	if err != nil {
		return errors.New("invoice does not exist")
	}

	if invoiceRes, ok := result.(*Invoice); ok {
		i = invoiceRes
		return nil
	}

	return errors.New("Failed to convert model to Invoice.")
}

func (i *Invoice) GetKeys() []string {
	return []string{
		"ID", "ParentExpenseID", "PayeeID", "Description", "Balance",
	}
}

func (i *Invoice) GetValue(key string) (any, error) {
	switch key {
	case "ID":
		return i.ID, nil
	case "ParentExpenseID":
		return i.ParentExpenseID, nil
	case "PayeeID":
		return i.PayeeID, nil
	case "Description":
		return i.Description, nil
	case "Balance":
		return i.Balance, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (i *Invoice) SetValue(key string, value any) error {
	switch key {
	case "ID":
		if ID, ok := value.(primitive.ObjectID); ok {
			i.ID = ID
			return nil
		}

		return errors.New("Failed to convert value to ObjectID.")
	case "ParentExpenseID":
		if ParentExpenseID, ok := value.(primitive.ObjectID); ok {
			i.ParentExpenseID = ParentExpenseID
			return nil
		}

		return errors.New("Failed to convert value to ObjectID.")
	case "PayeeID":
		if PayeeID, ok := value.(primitive.ObjectID); ok {
			i.PayeeID = PayeeID
			return nil
		}

		return errors.New("Failed to convert value to ObjectID.")
	case "Description":
		if Description, ok := value.(string); ok {
			i.Description = Description
			return nil
		}

		return errors.New("Failed to convert value to string.")
	case "Balance":
		if Balance, ok := value.(float64); ok {
			i.Balance = Balance
			return nil
		}

		return errors.New("Failed to convert value to float64.")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
