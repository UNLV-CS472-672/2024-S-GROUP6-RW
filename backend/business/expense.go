package business

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateExpense(expense models.Expense, database db.Database) (*models.Expense, error) {
	// Acquire reference to trio owner
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": expense.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to trip
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingOwner.ID, "Title": expense.TripTitle}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Check that expense doesn't already exist
	_, err = database["ExpenseDetails"].FindDocument(bson.M{"ParentTripID": existingTrip.ID, "Title": expense.Title}, "Expense")

	if err == nil {
		return nil, errors.New("expense already exists")
	}

	// Create new expense
	newExpense := &models.Expense{
		ParentTripID:     existingTrip.ID,
		Title:            expense.Title,
		Amount:           expense.Amount,
		InvoiceIDs:       make([]primitive.ObjectID, 0),
		RemainingBalance: expense.Amount,
		IsPaid:           false,
	}

	document, err = database["ExpenseDetails"].InsertDocument(newExpense, "Expense")

	if err != nil {
		return nil, err
	}

	insertedExpense, ok := document.(*models.Expense)

	if !ok {
		return nil, errors.New("failed to convert model to Expense")
	}

	// Add expense to trip
	existingTrip.ExpenseIDs = append(existingTrip.ExpenseIDs, insertedExpense.ID)

	update := bson.M{
		"ExpenseIDs": existingTrip.ExpenseIDs,
	}

	_, err = database["TripDetails"].UpdateDocument(bson.M{"_id": existingTrip.ID}, update, "Trip")

	if err != nil {
		return nil, err
	}

	return insertedExpense, nil
}

func GetAllExpenses(trip models.Trip, database db.Database) ([]*models.Expense, error) {
	// Acquire reference to trip
	existingTrip, err := GetTrip(trip, database)

	if err != nil {
		return nil, err
	}

	// Collect expenses from trip
	expenseList := []*models.Expense{}

	for _, expenseID := range existingTrip.ExpenseIDs {
		// Acquire reference to expense
		document, err := database["ExpenseDetails"].FindDocument(bson.M{"_id": expenseID}, "Expense")

		if err != nil {
			return nil, err
		}

		existingExpense, ok := document.(*models.Expense)

		if !ok {
			return nil, errors.New("failed to convert model to Expense")
		}

		expenseList = append(expenseList, existingExpense)
	}

	return expenseList, nil
}

func GetExpense(expense models.Expense, database db.Database) (*models.Expense, error) {
	// Acquire reference to trip owner
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": expense.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to trip
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingOwner.ID, "Title": expense.TripTitle}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Acquire reference to expense
	document, err = database["ExpenseDetails"].FindDocument(bson.M{"ParentTripID": existingTrip.ID, "Title": expense.Title}, "Expense")

	if err != nil {
		return nil, err
	}

	existingExpense, ok := document.(*models.Expense)

	if !ok {
		return nil, errors.New("failed to convert model to Expense")
	}

	return existingExpense, nil
}

func EditExpense(expense models.Expense, database db.Database) (*models.Expense, error) {
	// Acquire reference to expense
	existingExpense, err := GetExpense(expense, database)

	if err != nil {
		return nil, err
	}

	// Collect updates to expense
	update := bson.M{}

	for _, entry := range expense.Modifications {
		switch entry.FieldName {
		case "Title":
			title, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert title to string")
			}

			update["Title"] = title
		case "Amount":
			amount, ok := entry.Data.(float64)

			if !ok {
				return nil, errors.New("failed to convert amount to float64")
			}

			update["Amount"] = amount
		case "RemainingBalance":
			remainingBalance, ok := entry.Data.(float64)

			if !ok {
				return nil, errors.New("failed to convert remaining balance to float64")
			}

			update["RemainingBalance"] = remainingBalance
		case "IsPaid":
			isPaid, ok := entry.Data.(bool)

			if !ok {
				return nil, errors.New("failed to convert paid status to bool")
			}

			update["IsPaid"] = isPaid
		default:
			return nil, errors.New("invalid field provided: " + entry.FieldName)
		}
	}

	// TODO: verify that edits to expense are valid before attempting to modify existing expense

	document, err := database["ExpenseDetails"].UpdateDocument(bson.M{"_id": existingExpense.ID}, update, "Expense")

	if err != nil {
		return nil, err
	}

	updatedExpense, ok := document.(*models.Expense)

	if !ok {
		return nil, errors.New("failed to convert model to Expense")
	}

	return updatedExpense, nil
}

func DeleteExpense(expense models.Expense, database db.Database) error {
	// Acquire reference to expense
	existingExpense, err := GetExpense(expense, database)

	if err != nil {
		return err
	}

	// Acquire reference to parent trip
	document, err := database["TripDetails"].FindDocument(bson.M{"_id": existingExpense.ParentTripID}, "Trip")

	if err != nil {
		return err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return errors.New("failed to convert model to Trip")
	}

	// Remove reference to expense from parent trip
	found, index := utility.Find(existingTrip.ExpenseIDs[:], existingExpense.ID)

	if !found {
		return errors.New("failed to locate expense in trip's expense list")
	}

	existingTrip.ExpenseIDs = append(existingTrip.ExpenseIDs[:index], existingTrip.ExpenseIDs[index+1:]...)

	// Update parent trip
	update := bson.M{
		"ExpenseIDs": existingTrip.ExpenseIDs,
	}

	_, err = database["TripDetails"].UpdateDocument(bson.M{"_id": existingTrip.ID}, update, "Trip")

	if err != nil {
		return err
	}

	return database["ExpenseDetails"].DeleteDocument(bson.M{"_id": existingExpense.ID}, "Expense")
}
