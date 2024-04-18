package business

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
)

func CreateInvoice(invoice models.Invoice, database db.Database) (*models.Invoice, error) {
	// Acquire reference to trip owner
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": invoice.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to trip
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingOwner.ID, "Title": invoice.TripTitle}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Acquire reference to expense
	document, err = database["ExpenseDetails"].FindDocument(bson.M{"ParentTripID": existingTrip.ID, "Title": invoice.ExpenseTitle}, "Expense")

	if err != nil {
		return nil, err
	}

	existingExpense, ok := document.(*models.Expense)

	if !ok {
		return nil, errors.New("failed to convert model to Expense")
	}

	// Acquire reference to proposed payee
	document, err = database["UserDetails"].FindDocument(bson.M{"Username": invoice.PayeeUsername}, "User")

	if err != nil {
		return nil, err
	}

	existingUser, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Check that invoice doesn't already exist
	_, err = database["InvoiceDetails"].FindDocument(bson.M{"ParentExpenseID": existingExpense.ID, "PayeeID": existingUser.ID, "Description": invoice.Description}, "Invoice")

	if err == nil {
		return nil, errors.New("invoice already exists")
	}

	// Create new invoice
	newInvoice := &models.Invoice{
		ParentExpenseID: existingExpense.ID,
		PayeeID:         existingUser.ID,
		Description:     invoice.Description,
		Balance:         invoice.Balance,
		IsPaid:          false,
	}

	document, err = database["InvoiceDetails"].InsertDocument(newInvoice, "Invoice")

	if err != nil {
		return nil, err
	}

	insertedInvoice, ok := document.(*models.Invoice)

	if !ok {
		return nil, errors.New("failed to convert model to Invoice")
	}

	return insertedInvoice, nil
}

func GetAllInvoices(expense models.Expense, database db.Database) ([]*models.Invoice, error) {
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

	// Collect list of invoices from expense
	invoiceList := []*models.Invoice{}

	for _, invoiceID := range existingExpense.InvoiceIDs {
		// Acquire reference to invoice
		document, err = database["InvoiceDetails"].FindDocument(bson.M{"_id": invoiceID}, "Invoice")

		if err != nil {
			return nil, err
		}

		existingInvoice, ok := document.(*models.Invoice)

		if !ok {
			return nil, errors.New("failed to convert model to Invoice")
		}

		invoiceList = append(invoiceList, existingInvoice)
	}

	return invoiceList, nil
}

func GetInvoice(invoice models.Invoice, database db.Database) (*models.Invoice, error) {
	// Acquire reference to trip owner
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": invoice.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to trip
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingOwner.ID, "Title": invoice.TripTitle}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Acquire reference to expense
	document, err = database["ExpenseDetails"].FindDocument(bson.M{"ParentTripID": existingTrip.ID, "Title": invoice.ExpenseTitle}, "Expense")

	if err != nil {
		return nil, err
	}

	existingExpense, ok := document.(*models.Expense)

	if !ok {
		return nil, errors.New("failed to convert model to Expense")
	}

	// Acquire reference to payee
	document, err = database["UserDetails"].FindDocument(bson.M{"Username": invoice.PayeeUsername}, "User")

	if err != nil {
		return nil, err
	}

	existingPayee, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to invoice
	document, err = database["InvoiceDetails"].FindDocument(bson.M{"ParentExpenseID": existingExpense.ID, "PayeeID": existingPayee.ID, "Description": invoice.Description}, "Invoice")

	if err != nil {
		return nil, err
	}

	existingInvoice, ok := document.(*models.Invoice)

	if !ok {
		return nil, errors.New("failed to convert model to Invoice")
	}

	return existingInvoice, nil
}

func EditInvoice(invoice models.Invoice, database db.Database) (*models.Invoice, error) {
	existingInvoice, err := GetInvoice(invoice, database)

	if err != nil {
		return nil, err
	}

	// Collect updates to invoice
	update := bson.M{}

	for _, entry := range invoice.Modifications {
		switch entry.FieldName {
		case "PayeeUsername":
			username, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert username to string")
			}

			// Acquire reference to payee
			document, err := database["UserDetails"].FindDocument(bson.M{"Username": username}, "User")

			if err != nil {
				return nil, err
			}

			existingUser, ok := document.(*models.User)

			if !ok {
				return nil, errors.New("failed to convert model to User")
			}

			update["PayeeID"] = existingUser.ID
		case "Description":
			description, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert description to string")
			}

			update["Description"] = description
		case "Balance":
			balance, ok := entry.Data.(float64)

			if !ok {
				return nil, errors.New("failed to convert balance to float64")
			}

			update["Balance"] = balance
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

	// TODO: verify that edits to invoice are valid before attempting to modify existing invoice

	document, err := database["InvoiceDetails"].UpdateDocument(bson.M{"_id": existingInvoice.ID}, update, "Invoice")

	if err != nil {
		return nil, err
	}

	updatedInvoice, ok := document.(*models.Invoice)

	if !ok {
		return nil, errors.New("failed to convert model to Invoice")
	}

	return updatedInvoice, nil
}

func DeleteInvoice(invoice models.Invoice, database db.Database) error {
	existingInvoice, err := GetInvoice(invoice, database)

	if err != nil {
		return err
	}

	// Acquire reference to parent expense
	document, err := database["ExpenseDetails"].FindDocument(bson.M{"_id": existingInvoice.ParentExpenseID}, "Expense")

	if err != nil {
		return err
	}

	existingExpense, ok := document.(*models.Expense)

	if !ok {
		return errors.New("failed to convert model to Expense")
	}

	// Remove reference to invoice from parent expense
	found, index := utility.Find(existingExpense.InvoiceIDs[:], existingInvoice.ID)

	if !found {
		return errors.New("failed to locate invoice in expense's invoice list")
	}

	existingExpense.InvoiceIDs = append(existingExpense.InvoiceIDs[:index], existingExpense.InvoiceIDs[index+1:]...)

	// Update parent expense
	update := bson.M{
		"InvoiceIDs": existingExpense.InvoiceIDs,
	}

	_, err = database["ExpenseDetails"].UpdateDocument(bson.M{"_id": existingExpense.ID}, update, "Expense")

	if err != nil {
		return err
	}

	return database["InvoiceDetails"].DeleteDocument(bson.M{"_id": existingInvoice.ID}, "Invoice")
}
