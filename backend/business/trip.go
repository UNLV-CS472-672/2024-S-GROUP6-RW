// 2024-S-GROUP6-RW\backend\business\trip.go

package business

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateTrip(trip models.Trip, database db.Database) (*models.Trip, error) {
	// Acquire user from database
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": trip.TripOwner}, "User")

	if err != nil {
		fmt.Printf("failed to find User: \n%s.\n", err)
		return nil, err
	}
	

	tripOwner, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Check that the trip doesn't already exist
	_, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": tripOwner.ID, "Title": trip.Title}, "Trip")

	if err == nil {
		return nil, errors.New("trip already exists")
	}

	// Create new trip
	newTrip := &models.Trip{
		TripOwnerID:  tripOwner.ID,
		Title:        trip.Title,
		LocationName: trip.LocationName,
		StartDate:    trip.StartDate,
		EndDate:      trip.EndDate,
		MemberIDs:    []primitive.ObjectID{tripOwner.ID},
		ActivityIDs:  make([]primitive.ObjectID, 0),
		ExpenseIDs:   make([]primitive.ObjectID, 0),
	}

	document, err = database["TripDetails"].InsertDocument(newTrip, "Trip")

	if err != nil {
		return nil, err
	}

	insertedTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	// Add new trip ID to owner's trip list
	tripOwner.TripIDs = append(tripOwner.TripIDs, insertedTrip.ID)

	// Update trip owner with new trip reference
	filter := bson.M{"_id": tripOwner.ID}

	update := bson.M{"TripIDs": tripOwner.TripIDs}

	_, err = database["UserDetails"].UpdateDocument(filter, update, "User")

	if err != nil {
		return nil, err
	}

	return insertedTrip, nil
}

func GetAllTrips(user models.User, database db.Database) ([]*models.Trip, error) {
	// Acquire user from database
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": user.Username}, "User")

	if err != nil {
		return []*models.Trip{}, err
	}

	existingUser, ok := document.(*models.User)

	if !ok {
		return []*models.Trip{}, errors.New("failed to convert model to User")
	}

	// Collect trips from user
	tripList := []*models.Trip{}

	for _, tripID := range existingUser.TripIDs {
		// Acquire trip from database
		document, err := database["TripDetails"].FindDocument(bson.M{"_id": tripID}, "Trip")

		if err != nil {
			return []*models.Trip{}, err
		}

		existingTrip, ok := document.(*models.Trip)

		if !ok {
			return []*models.Trip{}, errors.New("failed to convert model to Trip")
		}

		// Check that user is a member of the trip
		found, _ := utility.Find(existingTrip.MemberIDs, existingUser.ID)

		if !found {
			return []*models.Trip{}, errors.New("failed to locate user in list")
		}

		tripList = append(tripList, existingTrip)
	}

	return tripList, nil
}

func GetTrip(trip models.Trip, database db.Database) (*models.Trip, error) {
	// Acquire user from database
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": trip.TripOwner}, "User")

	if err != nil {
		return nil, err
	}

	existingUser, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	// Acquire trip from database
	document, err = database["TripDetails"].FindDocument(bson.M{"TripOwnerID": existingUser.ID, "Title": trip.Title}, "Trip")

	if err != nil {
		return nil, err
	}

	existingTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	return existingTrip, nil
}

func EditTrip(trip models.Trip, database db.Database) (*models.Trip, error) {
	existingTrip, err := GetTrip(trip, database)

	if err != nil {
		return nil, err
	}

	// Collect updates to trip
	update := bson.M{}

	for _, entry := range trip.Modifications {
		switch entry.FieldName {
		case "TripOwnerUsername":
			username, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert username to string")
			}

			// Acquire reference to owner
			document, err := database["UserDetails"].FindDocument(bson.M{"Username": username}, "User")

			if err != nil {
				return nil, err
			}

			existingUser, ok := document.(*models.User)

			if !ok {
				return nil, errors.New("failed to convert model to User")
			}

			update["TripOwnerID"] = existingUser.ID

			// Also add new owner to trip
			members, ok := update["MemberIDs"]

			var memberList []primitive.ObjectID

			if !ok {
				memberList = existingTrip.MemberIDs
			} else {
				memberList, ok = members.([]primitive.ObjectID)

				if !ok {
					return nil, errors.New("failed to convert member list to ObjectID array")
				}
			}

			found, _ := utility.Find(memberList[:], existingUser.ID)

			if found {
				return nil, errors.New("cannot set user to owner and add them to the trip")
			}

			memberList = append(memberList, existingUser.ID)

			update["MemberIDs"] = memberList
		case "Title":
			title, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert title to string")
			}

			update["Title"] = title
		case "LocationName":
			location, ok := entry.Data.(string)

			if !ok {
				return nil, errors.New("failed to convert location to string")
			}

			update["LocationName"] = location
		case "AddMembers":
			members, ok := update["MemberIDs"]

			var memberList []primitive.ObjectID

			if !ok {
				memberList = existingTrip.MemberIDs
			} else {
				memberList, ok = members.([]primitive.ObjectID)

				if !ok {
					return nil, errors.New("failed to convert member list to ObjectID array")
				}
			}

			userList, ok := entry.Data.([]string)

			if !ok {
				return nil, errors.New("failed to convert user list to string array")
			}

			for _, username := range userList {
				document, err := database["UserDetails"].FindDocument(bson.M{"Username": username}, "User")

				if err != nil {
					return nil, err
				}

				existingUser, ok := document.(*models.User)

				if !ok {
					return nil, errors.New("failed to convert model to User")
				}

				found, _ := utility.Find(existingUser.TripIDs[:], existingTrip.ID)

				if found {
					return nil, errors.New("user has reference to trip")
				}

				found, _ = utility.Find(memberList[:], existingUser.ID)

				if found {
					return nil, errors.New("trip has reference to user")
				}

				memberList = append(memberList, existingUser.ID)

				// Also add trip to member's trip list
				existingUser.TripIDs = append(existingUser.TripIDs, existingTrip.ID)

				_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingUser.ID}, bson.M{"TripIDs": existingUser.TripIDs}, "User")

				if err != nil {
					return nil, err
				}
			}

			update["MemberIDs"] = memberList
		case "RemoveMembers":
			members, ok := update["MemberIDs"]

			var memberList []primitive.ObjectID

			if !ok {
				memberList = existingTrip.MemberIDs
			} else {
				memberList, ok = members.([]primitive.ObjectID)

				if !ok {
					return nil, errors.New("failed to convert member list to ObjectID array")
				}
			}

			userList, ok := entry.Data.([]string)

			if !ok {
				return nil, errors.New("failed to convert user list to string array")
			}

			for _, username := range userList {
				document, err := database["UserDetails"].FindDocument(bson.M{"Username": username}, "User")

				if err != nil {
					return nil, err
				}

				existingUser, ok := document.(*models.User)

				if !ok {
					return nil, errors.New("failed to convert model to User")
				}

				found, _ := utility.Find(existingUser.TripIDs[:], existingTrip.ID)

				if !found {
					return nil, errors.New("user does not have reference to trip")
				}

				found, index := utility.Find(memberList[:], existingUser.ID)

				if !found {
					return nil, errors.New("trip does not have reference to user")
				}

				memberList = append(memberList[:index], memberList[index+1:]...)
			}

			update["MemberIDs"] = memberList
		case "DateRange":
			// TODO: parse data field for start and end date values
			// y, m, d, tz := 0, 0, 0, time.Local
			// newStart := primitive.NewDateTimeFromTime(time.Date(y, time.Month(m), d, 0, 0, 0, 0, tz))
			// newEnd   := primitive.NewDateTimeFromTime(time.Date(y, time.Month(m), d, 0, 0, 0, 0, tz))
		default:
			return nil, errors.New("invalid field provided: " + entry.FieldName)
		}
	}

	// TODO: verify that edits to trip are valid before attempting to modify existing trip

	document, err := database["TripDetails"].UpdateDocument(bson.M{"_id": existingTrip.ID}, update, "Trip")

	if err != nil {
		return nil, err
	}

	updatedTrip, ok := document.(*models.Trip)

	if !ok {
		return nil, errors.New("failed to convert model to Trip")
	}

	return updatedTrip, nil
}

func DeleteTrip(trip models.Trip, database db.Database) error {
	existingTrip, err := GetTrip(trip, database)

	if err != nil {
		return err
	}

	// Remove reference to trip from members of trip
	for _, memberID := range existingTrip.MemberIDs {
		if existingTrip.TripOwnerID != memberID {
			// Acquire reference to member
			document, err := database["UserDetails"].FindDocument(bson.M{"_id": memberID}, "User")

			if err != nil {
				return err
			}

			existingMember, ok := document.(*models.User)

			if !ok {
				return errors.New("failed to convert model to User")
			}

			// Discard this trip from the member's trip list
			found, index := utility.Find(existingMember.TripIDs[:], existingTrip.ID)

			if !found {
				return errors.New("failed to locate trip in list")
			}

			existingMember.TripIDs = append(existingMember.TripIDs[:index], existingMember.TripIDs[index+1:]...)

			// Update member's document in database
			_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": memberID}, bson.M{"TripIDs": existingMember.TripIDs}, "User")

			if err != nil {
				return err
			}
		}
	}

	// Remove activities of this trip from the database
	for _, activityID := range existingTrip.ActivityIDs {
		// Acquire reference to activity
		_, err := database["ActivityDetails"].FindDocument(bson.M{"_id": activityID}, "Activity")

		if err != nil {
			return err
		}

		// Remove activity from database
		err = database["ActivityDetails"].DeleteDocument(bson.M{"_id": activityID}, "Activity")

		if err != nil {
			return err
		}
	}

	// Remove expenses of this trip from the database
	for _, expenseID := range existingTrip.ExpenseIDs {
		// Acquire reference to expense
		document, err := database["ExpenseDetails"].FindDocument(bson.M{"_id": expenseID}, "Expense")

		if err != nil {
			return err
		}

		existingExpense, ok := document.(*models.Expense)

		if !ok {
			return errors.New("failed to convert model to Expense")
		}

		// Remove invoices of this expense from the database
		for _, invoiceID := range existingExpense.InvoiceIDs {
			// Acquire reference to invoice
			document, err := database["InvoiceDetails"].FindDocument(bson.M{"_id": invoiceID}, "Invoice")

			if err != nil {
				return err
			}

			existingInvoice, ok := document.(*models.Invoice)

			if !ok {
				return errors.New("failed to convert model to Invoice")
			}

			// Remove invoice from payee
			payeeID := existingInvoice.PayeeID

			// Acquire reference to payee
			document, err = database["UserDetails"].FindDocument(bson.M{"_id": payeeID}, "User")

			if err != nil {
				return err
			}

			existingPayee, ok := document.(*models.User)

			if !ok {
				return errors.New("failed to convert model to User")
			}

			// Discard this invoice from the payee's invoice list
			found, index := utility.Find(existingPayee.InvoiceIDs[:], invoiceID)

			if !found {
				return errors.New("failed to locate invoice in list")
			}

			existingPayee.InvoiceIDs = append(existingPayee.InvoiceIDs[:index], existingPayee.InvoiceIDs[index+1:]...)

			// Update payee's document in database
			_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": payeeID}, bson.M{"InvoiceIDs": existingPayee.InvoiceIDs}, "User")

			if err != nil {
				return err
			}

			// Remove invoice from database
			err = database["InvoiceDetails"].DeleteDocument(bson.M{"_id": invoiceID}, "Invoice")

			if err != nil {
				return err
			}
		}

		// Remove expense from database
		err = database["ExpenseDetails"].DeleteDocument(bson.M{"_id": expenseID}, "Expense")

		if err != nil {
			return err
		}
	}

	return database["TripDetails"].DeleteDocument(bson.M{"_id": existingTrip.ID}, "Trip")
}
