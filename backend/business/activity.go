package business

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateActivity(activity models.Activity, database db.Database) (*models.Activity, error) {
	// Acquire reference to trip owner
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": activity.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to trip
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingOwner.ID, "Title": activity.TripTitle}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Check that activity doesn't already exist
	_, err = database["ActivityDetails"].FindDocument(bson.M{"ParentTripID": existingTrip.ID, "StartDate": activity.StartDate, "LocationName": activity.LocationName}, "Activity")

	if err == nil {
		return nil, errors.New("activity already exists")
	}

	// Create new activity
	newActivity := &models.Activity{
		ParentTripID: existingTrip.ID,
		Description:  activity.Description,
		StartDate:    activity.StartDate,
		EndDate:      activity.EndDate,
		ImageURI:     activity.ImageURI,
		IsMapBased:   activity.IsMapBased,
		LocationName: activity.LocationName,
		Address:      activity.Address,
		Coordinate:   activity.Coordinate,
	}

	document, err = database["ActivityDetails"].InsertDocument(newActivity, "Activity")

	if err != nil {
		return nil, err
	}

	insertedActivity, ok := document.(*models.Activity)

	if !ok {
		return nil, errors.New("failed to convert model to Activitiy")
	}

	// Add activity to trip
	existingTrip.ActivityIDs = append(existingTrip.ActivityIDs, insertedActivity.ID)

	update := bson.M{
		"ActivityIDs": existingTrip.ActivityIDs,
	}

	_, err = database["TripDetails"].UpdateDocument(bson.M{"_id": existingTrip.ID}, update, "Trip")

	if err != nil {
		return nil, err
	}

	return insertedActivity, nil
}

func GetAllActivities(trip models.Trip, database db.Database) ([]*models.Activity, error) {
	// Acquire reference to trip
	existingTrip, err := GetTrip(trip, database)

	if err != nil {
		return nil, err
	}

	// Collect activites from trip
	activityList := []*models.Activity{}

	for _, activityID := range existingTrip.ActivityIDs {
		// Acquire reference to activity
		document, err := database["ActivityDetails"].FindDocument(bson.M{"_id": activityID}, "Activity")

		if err != nil {
			return nil, err
		}

		existingActivity, ok := document.(*models.Activity)

		if !ok {
			return nil, errors.New("failed to convert model to Activity")
		}

		activityList = append(activityList, existingActivity)
	}

	return activityList, nil
}

func GetActivity(activity models.Activity, database db.Database) (*models.Activity, error) {
	// Acquire reference to trip owner
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": activity.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire reference to trip
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingOwner.ID, "Title": activity.TripTitle}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Acquire reference to activity
	document, err = database["ActivityDetails"].FindDocument(bson.M{"ParentTripID": existingTrip.ID, "StartDate": activity.StartDate, "LocationName": activity.LocationName}, "Activity")

	if err != nil {
		return nil, err
	}

	existingActivity, ok := document.(*models.Activity)

	if !ok {
		return nil, errors.New("failed to convert model to Activity")
	}

	return existingActivity, nil
}

func EditActivity(activity models.Activity, database db.Database) (*models.Activity, error) {
	// Acquire reference to activity
	existingActivity, err := GetActivity(activity, database)

	if err != nil {
		return nil, err
	}

	// Collect updates to activity
	update := bson.M{}

	for _, entry := range activity.Modifications {
		switch entry.FieldName {
		case "Description":
			description, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert description to string")
			}

			update["Description"] = description
		case "StartDate":
			startDate, ok := entry.Data.(primitive.DateTime)

			if !ok {
				return nil, errors.New("failed to convert start date to DateTime")
			}

			update["StartDate"] = startDate
		case "EndDate":
			endDate, ok := entry.Data.(primitive.DateTime)

			if !ok {
				return nil, errors.New("failed to convert end date to DateTime")
			}

			update["EndDate"] = endDate
		case "ImageURI":
			imageURI, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert image URI to string")
			}

			update["ImageURI"] = imageURI
		case "IsMapBased":
			isMapBased, ok := entry.Data.(bool)

			if !ok {
				return nil, errors.New("failed to convert map-based status to bool")
			}

			update["IsMapBased"] = isMapBased
		case "LocationName":
			locationName, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert location name to string")
			}

			update["LocationName"] = locationName
		case "Address":
			address, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert address to string")
			}

			update["Address"] = address
		case "Coordinate":
			coordinate, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert coordinate to string")
			}

			update["Coordinate"] = coordinate
		default:
			return nil, errors.New("invalid field provided: " + entry.FieldName)
		}
	}

	// TODO: verify that edits to activity are valid before attempting to modify existing activity

	document, err := database["ActivityDetails"].UpdateDocument(bson.M{"_id": existingActivity.ID}, update, "Activity")

	if err != nil {
		return nil, err
	}

	updatedActivity, ok := document.(*models.Activity)

	if !ok {
		return nil, errors.New("failed to convert model to Activity")
	}

	return updatedActivity, nil
}

func DeleteActivity(activity models.Activity, database db.Database) error {
	// Acquire reference to activity
	existingActivity, err := GetActivity(activity, database)

	if err != nil {
		return err
	}

	// Acquire reference to parent trip
	document, err := database["TripDetails"].FindDocument(bson.M{"_id": existingActivity.ParentTripID}, "Trip")

	if err != nil {
		return err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return errors.New("failed to convert model to Trip")
	}

	// Remove reference to activity from parent trip
	found, index := utility.Find(existingTrip.ActivityIDs[:], existingActivity.ID)

	if !found {
		return errors.New("failed to locate activity in trip's activity list")
	}

	existingTrip.ActivityIDs = append(existingTrip.ActivityIDs[:index], existingTrip.ActivityIDs[index+1:]...)

	// Update parent trip
	update := bson.M{
		"ActivityIDs": existingTrip.ActivityIDs,
	}

	_, err = database["TripDetails"].UpdateDocument(bson.M{"_id": existingTrip.ID}, update, "Trip")

	if err != nil {
		return err
	}

	return database["ActivityDetails"].DeleteDocument(bson.M{"_id": existingActivity.ID}, "Activity")
}
