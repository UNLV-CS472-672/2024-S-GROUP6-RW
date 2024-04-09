package business

import (
	"backend/db"
	"backend/models"
)

func CreateExpense(expense models.Expense, database db.Database) (*models.Expense, error) {
	// TODO: Implement create expense business logic

	return nil, nil
}

func GetAllExpenses(trip models.Trip, database db.Database) ([]*models.Expense, error) {
	// TODO: Implement get all expenses business logic

	return nil, nil
}

// TODO: Decide how to differentiate expenses from each other for searching
func GetExpense(expense models.Expense, database db.Database) (*models.Expense, error) {
	// TODO: Implement get expense business logic

	return nil, nil
}

// TODO: Decide how to differentiate expenses from each other for searching
func EditExpense(expense models.Expense, database db.Database) (*models.Expense, error) {
	// TODO: Implement edit expense business logic

	return nil, nil
}

// TODO: Decide how to differentiate expenses from each other for searching
func DeleteExpense(expense models.Expense, database db.Database) error {
	// TODO: Implement delete expense business logic

	return nil
}
