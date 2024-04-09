package business

import (
	"backend/db"
	"backend/models"
)

func CreateActivity(activity models.Activity, database db.Database) (*models.Activity, error) {
	// TODO: implement create profile business logic

	return nil, nil
}

func GetAllActivities(trip models.Trip, database db.Database) ([]*models.Activity, error) {
	// TODO: implement get all activities business logic

	return nil, nil
}

// TODO: decide how to differentiate activities from each other for searching
func GetActivity(activity models.Activity, database db.Database) (*models.Activity, error) {
	// TODO: implement get activity business logic

	return nil, nil
}

// TODO: decide how to differentiate activities from each other for searching
func EditActivity(activity models.Activity, database db.Database) (*models.Activity, error) {
	// TODO: implement edit activity business logic

	return nil, nil
}

// TODO: decide how to differentiate activities from each other for searching
func DeleteActivity(activity models.Activity, database db.Database) error {
	// TODO: implement delete activity business logic

	return nil
}
