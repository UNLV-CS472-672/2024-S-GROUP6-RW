package business

import (
	"backend/db"
	"backend/models"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateProfile(user models.User, database db.Database) (*models.Profile, error) {
	// Check that the profile doesn't already exist
	_, err := database["ProfileDetails"].FindDocument(bson.M{"Username": user.Username}, "Profile")

	if err == nil {
		return nil, errors.New("Profile already exists.")
	}

	// Create new profile
	newProfile := &models.Profile{
		Username:    user.Username,
		DisplayName: user.FirstName + " " + user.LastName,
		Joined:      primitive.NewDateTimeFromTime(time.Now()),
		About:       "",
	}

	insertResult, err := database["ProfileDetails"].InsertDocument(newProfile, "Profile")

	if err != nil {
		return nil, err
	}

	insertedProfile, ok := insertResult.(*models.Profile)

	if !ok {
		return nil, errors.New("Failed to convert model to Profile.")
	}

	return insertedProfile, nil
}

func GetProfile(user models.User, database db.Database) (*models.Profile, error) {
	// TODO: Implement get profile business logic

	return nil, nil
}

func EditProfile(profile models.Profile, database db.Database) (*models.Profile, error) {
	// TODO: Implement edit profile business logic

	return nil, nil
}

func DeleteProfile(profile models.Profile, database db.Database) error {
	// TODO: Implement delete profile business logic

	return nil
}
