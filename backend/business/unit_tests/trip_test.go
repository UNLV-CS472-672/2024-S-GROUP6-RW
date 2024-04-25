package business

import (
	"backend/business"
	"backend/db"
	"backend/models"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestCreateTrip(t *testing.T) {
	database := db.GetMockDatabase()

	// Create user
	user := &models.User{
		Username:  "jdoe",
		Email:     "johndoe@gmail.com",
		FirstName: "John",
		LastName:  "Doe",
		Password:  "password123",
	}

	newUser, err := business.CreateUser(*user, database)

	assert.NoError(t, err)

	// Create trip for user
	start, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-22T07:00:00.000Z")

	assert.NoError(t, err)

	end, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-30T07:00:00.000Z")

	assert.NoError(t, err)

	trip := &models.Trip{
		TripOwner:    newUser.Username,
		Title:        "Trip To Lago",
		LocationName: "Lago, Darazo, Bauchi State, Nigeria",
		StartDate:    primitive.NewDateTimeFromTime(start),
		EndDate:      primitive.NewDateTimeFromTime(end),
	}

	newTrip, err := business.CreateTrip(*trip, database)

	assert.NoError(t, err)

	assert.Equal(t, newTrip.TripOwnerID, newUser.ID)
	assert.Equal(t, newTrip.Title, "Trip To Lago")
	assert.Equal(t, newTrip.LocationName, "Lago, Darazo, Bauchi State, Nigeria")
	assert.Equal(t, newTrip.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, newTrip.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, newTrip.MemberIDs, []primitive.ObjectID{newUser.ID})
	assert.Equal(t, newTrip.ActivityIDs, []primitive.ObjectID{})
	assert.Equal(t, newTrip.ExpenseIDs, []primitive.ObjectID{})
}

func TestGetAllTrips(t *testing.T) {
	database := db.GetMockDatabase()

	// Create user
	user := &models.User{
		Username:  "jdoe",
		Email:     "johndoe@hgmail.com",
		FirstName: "John",
		LastName:  "Doe",
		Password:  "password123",
	}

	newUser, err := business.CreateUser(*user, database)

	assert.NoError(t, err)

	// Create trips for user
	tripTitles := []string{
		"Party Time", "Grand Canyon Hiking", "Machu Picchu",
	}

	tripLocations := []string{
		"Las Vegas, Nevada, United States", "Grand Canyon National Park, Arizona, United States",
		"Historic Sanctuary of Machu Picchu, Peru",
	}

	startDates := []string{
		"2024-04-01T09:00:00.000Z", "2024-04-08T11:00:00.000Z",
		"2024-05-04T13:00:00.000Z",
	}

	endDates := []string{
		"2024-04-07T20:00:00.000Z", "2024-04-22T15:00:00.000Z",
		"2024-05-07T08:00:00.000Z",
	}

	for i := range len(tripTitles) {
		start, err := time.Parse("2006-01-02T15:04:05.000Z", startDates[i])

		assert.NoError(t, err)

		end, err := time.Parse("2006-01-02T15:04:05.000Z", endDates[i])

		assert.NoError(t, err)

		trip := &models.Trip{
			TripOwner:    newUser.Username,
			Title:        tripTitles[i],
			LocationName: tripLocations[i],
			StartDate:    primitive.NewDateTimeFromTime(start),
			EndDate:      primitive.NewDateTimeFromTime(end),
		}

		newTrip, err := business.CreateTrip(*trip, database)

		assert.NoError(t, err)

		assert.Equal(t, newTrip.TripOwnerID, newUser.ID)
		assert.Equal(t, newTrip.Title, tripTitles[i])
		assert.Equal(t, newTrip.LocationName, tripLocations[i])
		assert.Equal(t, newTrip.StartDate, primitive.NewDateTimeFromTime(start))
		assert.Equal(t, newTrip.EndDate, primitive.NewDateTimeFromTime(end))
		assert.Equal(t, newTrip.MemberIDs, []primitive.ObjectID{newUser.ID})
		assert.Equal(t, newTrip.ActivityIDs, []primitive.ObjectID{})
		assert.Equal(t, newTrip.ExpenseIDs, []primitive.ObjectID{})
	}

	// Acquire list of trips for user
	tripList, err := business.GetAllTrips(*newUser, database)

	assert.NoError(t, err)

	assert.Equal(t, len(tripList), 3)

	// TODO: Test content of trip list
}

func TestGetTrip(t *testing.T) {
	database := db.GetMockDatabase()

	// Create user
	user := &models.User{
		Username:  "jdoe",
		Email:     "johndoe@gmail.com",
		FirstName: "John",
		LastName:  "Doe",
		Password:  "password123",
	}

	newUser, err := business.CreateUser(*user, database)

	assert.NoError(t, err)

	// Create trip for user
	start, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-22T07:00:00.000Z")

	assert.NoError(t, err)

	end, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-30T07:00:00.000Z")

	assert.NoError(t, err)

	trip := &models.Trip{
		TripOwner:    newUser.Username,
		Title:        "Trip To Lago",
		LocationName: "Lago, Darazo, Bauchi State, Nigeria",
		StartDate:    primitive.NewDateTimeFromTime(start),
		EndDate:      primitive.NewDateTimeFromTime(end),
	}

	newTrip, err := business.CreateTrip(*trip, database)

	assert.NoError(t, err)

	assert.Equal(t, newTrip.TripOwnerID, newUser.ID)
	assert.Equal(t, newTrip.Title, "Trip To Lago")
	assert.Equal(t, newTrip.LocationName, "Lago, Darazo, Bauchi State, Nigeria")
	assert.Equal(t, newTrip.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, newTrip.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, newTrip.MemberIDs, []primitive.ObjectID{newUser.ID})
	assert.Equal(t, newTrip.ActivityIDs, []primitive.ObjectID{})
	assert.Equal(t, newTrip.ExpenseIDs, []primitive.ObjectID{})

	// Acquire trip from user given known data
	tripQuery := &models.Trip{
		TripOwner: newUser.Username,
		Title:     newTrip.Title,
	}

	existingTrip, err := business.GetTrip(*tripQuery, database)

	assert.NoError(t, err)

	assert.Equal(t, existingTrip.TripOwnerID, newUser.ID)
	assert.Equal(t, existingTrip.Title, "Trip To Lago")
	assert.Equal(t, existingTrip.LocationName, "Lago, Darazo, Bauchi State, Nigeria")
	assert.Equal(t, existingTrip.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, existingTrip.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, existingTrip.MemberIDs, []primitive.ObjectID{newUser.ID})
	assert.Equal(t, existingTrip.ActivityIDs, []primitive.ObjectID{})
	assert.Equal(t, existingTrip.ExpenseIDs, []primitive.ObjectID{})
}

func TestEditTrip(t *testing.T) {
	database := db.GetMockDatabase()

	// Create user
	user := &models.User{
		Username:  "jdoe",
		Email:     "johndoe@gmail.com",
		FirstName: "John",
		LastName:  "Doe",
		Password:  "password123",
	}

	newUser, err := business.CreateUser(*user, database)

	assert.NoError(t, err)

	// Create trip for user
	start, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-22T07:00:00.000Z")

	assert.NoError(t, err)

	end, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-30T07:00:00.000Z")

	assert.NoError(t, err)

	trip := &models.Trip{
		TripOwner:    newUser.Username,
		Title:        "Trip To Lago",
		LocationName: "Lago, Darazo, Bauchi State, Nigeria",
		StartDate:    primitive.NewDateTimeFromTime(start),
		EndDate:      primitive.NewDateTimeFromTime(end),
	}

	newTrip, err := business.CreateTrip(*trip, database)

	assert.NoError(t, err)

	assert.Equal(t, newTrip.TripOwnerID, newUser.ID)
	assert.Equal(t, newTrip.Title, "Trip To Lago")
	assert.Equal(t, newTrip.LocationName, "Lago, Darazo, Bauchi State, Nigeria")
	assert.Equal(t, newTrip.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, newTrip.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, newTrip.MemberIDs, []primitive.ObjectID{newUser.ID})
	assert.Equal(t, newTrip.ActivityIDs, []primitive.ObjectID{})
	assert.Equal(t, newTrip.ExpenseIDs, []primitive.ObjectID{})

	// Create new users to modify trip around
	otherUser := &models.User{
		Username:  "bsmith",
		Email:     "bobsmith@gmail.com",
		FirstName: "Bob",
		LastName:  "Smith",
		Password:  "password321",
	}

	anotherUser := &models.User{
		Username:  "janedoe",
		Email:     "janedoe@gmail.com",
		FirstName: "Jane",
		LastName:  "Doe",
		Password:  "password132",
	}

	newOtherUser, err := business.CreateUser(*otherUser, database)

	assert.NoError(t, err)

	newAnotherUser, err := business.CreateUser(*anotherUser, database)

	assert.NoError(t, err)

	// Edit trip details for existing trip
	tripEdits := &models.Trip{
		TripOwner: newUser.Username,
		Title:     newTrip.Title,
		Modifications: []models.Modification{
			{
				FieldName: "TripOwnerUsername",
				Data:      newOtherUser.Username,
			},
			{
				FieldName: "Title",
				Data:      "Paris Expedition",
			},
			{
				FieldName: "LocationName",
				Data:      "Paris, France",
			},
			{
				FieldName: "AddMembers",
				Data:      []string{newAnotherUser.Username},
			},
			{
				FieldName: "RemoveMembers",
				Data:      []string{newUser.Username},
			},
		},
	}

	editedTrip, err := business.EditTrip(*tripEdits, database)

	assert.NoError(t, err)

	assert.Equal(t, editedTrip.TripOwnerID, newOtherUser.ID)
	assert.Equal(t, editedTrip.Title, "Paris Expedition")
	assert.Equal(t, editedTrip.LocationName, "Paris, France")
	assert.Equal(t, editedTrip.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, editedTrip.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, editedTrip.MemberIDs, []primitive.ObjectID{newOtherUser.ID, newAnotherUser.ID})
	assert.Equal(t, editedTrip.ActivityIDs, []primitive.ObjectID{})
	assert.Equal(t, editedTrip.ExpenseIDs, []primitive.ObjectID{})
}

func TestDeleteTrip(t *testing.T) {
	database := db.GetMockDatabase()

	// Create user
	user := &models.User{
		Username:  "jdoe",
		Email:     "johndoe@gmail.com",
		FirstName: "John",
		LastName:  "Doe",
		Password:  "password123",
	}

	newUser, err := business.CreateUser(*user, database)

	assert.NoError(t, err)

	// Create trip for user
	start, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-22T07:00:00.000Z")

	assert.NoError(t, err)

	end, err := time.Parse("2006-01-02T15:04:05.000Z", "2024-04-30T07:00:00.000Z")

	assert.NoError(t, err)

	trip := &models.Trip{
		TripOwner:    newUser.Username,
		Title:        "Trip To Lago",
		LocationName: "Lago, Darazo, Bauchi State, Nigeria",
		StartDate:    primitive.NewDateTimeFromTime(start),
		EndDate:      primitive.NewDateTimeFromTime(end),
	}

	newTrip, err := business.CreateTrip(*trip, database)

	assert.NoError(t, err)

	assert.Equal(t, newTrip.TripOwnerID, newUser.ID)
	assert.Equal(t, newTrip.Title, "Trip To Lago")
	assert.Equal(t, newTrip.LocationName, "Lago, Darazo, Bauchi State, Nigeria")
	assert.Equal(t, newTrip.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, newTrip.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, newTrip.MemberIDs, []primitive.ObjectID{newUser.ID})
	assert.Equal(t, newTrip.ActivityIDs, []primitive.ObjectID{})
	assert.Equal(t, newTrip.ExpenseIDs, []primitive.ObjectID{})

	// Create new user to add as trip member
	otherUser := &models.User{
		Username:  "bsmith",
		Email:     "bobsmith@gmail.com",
		FirstName: "Bob",
		LastName:  "Smith",
		Password:  "password321",
	}

	newOtherUser, err := business.CreateUser(*otherUser, database)

	assert.NoError(t, err)

	// Add user to trip
	tripEdits := &models.Trip{
		TripOwner: newUser.Username,
		Title:     newTrip.Title,
		Modifications: []models.Modification{
			{
				FieldName: "AddMembers",
				Data:      []string{newOtherUser.Username},
			},
		},
	}

	editedTrip, err := business.EditTrip(*tripEdits, database)

	assert.NoError(t, err)

	// Create activity for trip
	activity := &models.Activity{
		TripOwner:    newUser.Username,
		TripTitle:    editedTrip.Title,
		Description:  "Go for a walk.",
		StartDate:    primitive.NewDateTimeFromTime(start),
		EndDate:      primitive.NewDateTimeFromTime(end),
		ImageURI:     "https://resource_uri.com/resource",
		IsMapBased:   true,
		LocationName: "Walking Path",
		Address:      "Placeholder Address, Lago, Darazo, Bauchi State, Nigeria",
		Coordinate:   "123.456, 78.901",
	}

	newActivity, err := business.CreateActivity(*activity, database)

	assert.NoError(t, err)

	assert.Equal(t, newActivity.ParentTripID, editedTrip.ID)
	assert.Equal(t, newActivity.Description, "Go for a walk.")
	assert.Equal(t, newActivity.StartDate, primitive.NewDateTimeFromTime(start))
	assert.Equal(t, newActivity.EndDate, primitive.NewDateTimeFromTime(end))
	assert.Equal(t, newActivity.ImageURI, "https://resource_uri.com/resource")
	assert.Equal(t, newActivity.IsMapBased, true)
	assert.Equal(t, newActivity.LocationName, "Walking Path")
	assert.Equal(t, newActivity.Address, "Placeholder Address, Lago, Darazo, Bauchi State, Nigeria")
	assert.Equal(t, newActivity.Coordinate, "123.456, 78.901")

	// Create expense for trip
	expense := &models.Expense{
		TripOwner: newUser.Username,
		TripTitle: editedTrip.Title,
		Title:     "Walking Shoes",
		Amount:    49.99,
	}

	newExpense, err := business.CreateExpense(*expense, database)

	assert.NoError(t, err)

	// Check for update to trip's expense list
	tripQuery := &models.Trip{
		TripOwner: newUser.Username,
		Title:     newTrip.Title,
	}

	updTrip, err := business.GetTrip(*tripQuery, database)

	assert.NoError(t, err)

	assert.Equal(t, updTrip.ExpenseIDs, []primitive.ObjectID{newExpense.ID})

	assert.Equal(t, newExpense.ParentTripID, editedTrip.ID)
	assert.Equal(t, newExpense.Title, "Walking Shoes")
	assert.Equal(t, newExpense.Amount, 49.99)
	assert.Equal(t, newExpense.InvoiceIDs, []primitive.ObjectID{})
	assert.Equal(t, newExpense.RemainingBalance, 49.99)
	assert.Equal(t, newExpense.IsPaid, false)

	// Create new invoice for expense
	invoice := &models.Invoice{
		TripOwner:     newUser.Username,
		TripTitle:     editedTrip.Title,
		ExpenseTitle:  newExpense.Title,
		PayeeUsername: newUser.Username,
		Description:   "For walking shoes.",
		Balance:       25.00,
	}

	newInvoice, err := business.CreateInvoice(*invoice, database)

	assert.NoError(t, err)

	// Check for update to expense's invoice list
	expenseQuery := &models.Expense{
		TripOwner: newUser.Username,
		TripTitle: editedTrip.Title,
		Title:     "Walking Shoes",
	}

	updExpense, err := business.GetExpense(*expenseQuery, database)

	assert.NoError(t, err)

	assert.Equal(t, updExpense.InvoiceIDs, []primitive.ObjectID{newInvoice.ID})

	assert.Equal(t, newInvoice.ParentExpenseID, newExpense.ID)
	assert.Equal(t, newInvoice.PayeeID, newUser.ID)
	assert.Equal(t, newInvoice.Description, "For walking shoes.")
	assert.Equal(t, newInvoice.Balance, 25.00)
	assert.Equal(t, newInvoice.IsPaid, false)

	// Check list of trips for new trip
	tripList, err := business.GetAllTrips(*newUser, database)

	assert.NoError(t, err)

	assert.Equal(t, len(tripList), 1)

	// Remove trip using known information
	deleteTrip := &models.Trip{
		TripOwner: newUser.Username,
		Title:     updTrip.Title,
	}

	err = business.DeleteTrip(*deleteTrip, database)

	assert.NoError(t, err)

	// Attempt to view trip knowing it was deleted
	_, err = business.GetTrip(*deleteTrip, database)

	assert.Error(t, err)
}
