package business

import (
	"backend/db"
	"backend/models"
)

func CreateInvoice(invoice models.Invoice, database db.Database) (*models.Invoice, error) {
	// TODO: Implement create invoice business logic

	return nil, nil
}

func GetAllInvoices(trip models.Trip, database db.Database) ([]*models.Invoice, error) {
	// TODO: Implement get all invoices business logic

	return nil, nil
}

// TODO: Decide how to differentiate invoices from each other for searching
func GetInvoice(invoice models.Invoice, database db.Database) (*models.Invoice, error) {
	// TODO: Implement get invoice business logic

	return nil, nil
}

// TODO: Decide how to differentiate invoices from each other for searching
func EditInvoice(invoice models.Invoice, database db.Database) (*models.Invoice, error) {
	// TODO: Implement edit invoice business logic

	return nil, nil
}

// TODO: Decide how to differentiate invoices from each other for searching
func DeleteInvoice(invoice models.Invoice, database db.Database) error {
	// TODO: Implement delete invoice business logic

	return nil
}
