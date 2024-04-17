package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Expense struct {
	// Fields for actual Expense document in database
	ID               primitive.ObjectID   `bson:"_id,omitempty"`
	ParentTripID     primitive.ObjectID   `bson:"ParentTripID,omitempty"`
	Title            string               `bson:"Title,omitempty"`
	Amount           float64              `bson:"Amount,omitempty"`
	InvoiceIDs       []primitive.ObjectID `bson:"InvoiceIDs,omitempty"`
	RemainingBalance float64              `bson:"RemainingBalance,omitempty"`
	IsPaid           bool                 `bson:"IsPaid,omitempty"`

	// Placeholder fields for user entry point data
	TripTitle     string
	TripOwner     string
	Modifications []Modification
}

func (e *Expense) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*e = Expense{}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("expense does not exist")
	}

	// Acquire value and validity of Expense fields from result
	var idOK, parentTripOK, descriptionOK, amountOK, invoicesOK, remainingBalanceOK, isPaidOK bool
	var invoiceList primitive.A
	var id primitive.ObjectID

	e.ID, idOK = result["_id"].(primitive.ObjectID)
	e.ParentTripID, parentTripOK = result["ParentTripID"].(primitive.ObjectID)
	e.Title, descriptionOK = result["Title"].(string)
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

// TODO: Verify integrity of mock document retrieval
func (e *Expense) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*e = Expense{}

	result, err := coll.FindDocument(filter, "Expense")

	if err != nil {
		return errors.New("expense does not exist")
	}

	if expenseRes, ok := result.(*Expense); ok {
		*e = *expenseRes
		return nil
	}

	return errors.New("failed to convert model to Expense")
}

func (e *Expense) GetKeys() []string {
	return []string{
		"_id", "ParentTripID", "Title", "Amount", "InvoiceIDs", "RemainingBalance",
		"IsPaid",
	}
}

func (e *Expense) GetValue(key string) (any, error) {
	switch key {
	case "_id":
		return e.ID, nil
	case "ParentTripID":
		return e.ParentTripID, nil
	case "Title":
		return e.Title, nil
	case "Amount":
		return e.Amount, nil
	case "InvoiceIDs":
		return e.InvoiceIDs, nil
	case "RemainingBalance":
		return e.RemainingBalance, nil
	case "IsPaid":
		return e.IsPaid, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (e *Expense) SetValue(key string, value any) error {
	switch key {
	case "_id":
		if ID, ok := value.(primitive.ObjectID); ok {
			e.ID = ID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "ParentTripID":
		if ParentTripID, ok := value.(primitive.ObjectID); ok {
			e.ParentTripID = ParentTripID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "Title":
		if Title, ok := value.(string); ok {
			e.Title = Title
			return nil
		}

		return errors.New("failed to convert value to string")
	case "Amount":
		if Amount, ok := value.(float64); ok {
			e.Amount = Amount
			return nil
		}

		return errors.New("failed to convert value to float64")
	case "InvoiceIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			e.InvoiceIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "RemainingBalance":
		if RemainingBalance, ok := value.(float64); ok {
			e.RemainingBalance = RemainingBalance
			return nil
		}

		return errors.New("failed to convert value to float64")
	case "IsPaid":
		if IsPaid, ok := value.(bool); ok {
			e.IsPaid = IsPaid
			return nil
		}

		return errors.New("failed to convert value to bool")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
