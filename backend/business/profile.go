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
		return nil, errors.New("profile already exists")
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
		return nil, errors.New("failed to convert model to Profile")
	}

	return insertedProfile, nil
}

func GetProfile(profile models.Profile, database db.Database) (*models.Profile, error) {
	// Acquire reference to profile
	document, err := database["ProfileDetails"].FindDocument(bson.M{"Username": profile.Username}, "Profile")

	if err != nil {
		return nil, err
	}

	existingProfile, ok := document.(*models.Profile)

	if !ok {
		return nil, errors.New("failed to convert model to Profile")
	}

	return existingProfile, nil
}

func EditProfile(profile models.Profile, database db.Database) (*models.Profile, error) {
	// TODO: Implement edit profile business logic
	// Acquire reference to profile
	document, err := database["ProfileDetails"].FindDocument(bson.M{"Username": profile.Username}, "Profile")

	if err != nil {
		return nil, err
	}

	existingProfile, ok := document.(*models.Profile)

	if !ok {
		return nil, errors.New("failed to convert model to profile")
	}

	// Collect updates to profile
	update := bson.M{}

	for _, entry := range profile.Modifications {
		switch entry.FieldName {
		case "Username":
			username, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert username to string")
			}

			update["Username"] = username
		case "DisplayName":
			displayName, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert display name to string")
			}

			update["DisplayName"] = displayName
		case "About":
			about, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert about to string")
			}

			update["About"] = about
		default:
			return nil, errors.New("invalid field provided: " + entry.FieldName)
		}
	}

	document, err = database["ProfileDetails"].UpdateDocument(bson.M{"Username": existingProfile.Username}, update, "Profile")

	if err != nil {
		return nil, err
	}

	updatedProfile, ok := document.(*models.Profile)

	if !ok {
		return nil, errors.New("failed to convert model to Profile")
	}

	return updatedProfile, nil
}

func DeleteProfile(profile models.Profile, database db.Database) error {
	// Acquire reference to profile
	_, err := database["ProfileDetails"].FindDocument(bson.M{"Username": profile.Username}, "Profile")

	if err != nil {
		return err
	}

	return database["ProfileDetails"].DeleteDocument(bson.M{"Username": profile.Username}, "Profile")
}
