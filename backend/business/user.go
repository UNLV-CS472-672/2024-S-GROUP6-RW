package business

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(user models.User, database db.Database) (*models.User, error) {
	// Check that the user doesn't already exist
	_, err := database["UserDetails"].FindDocument(bson.M{"Username": user.Username}, "User")

	if err == nil {
		return nil, errors.New("user already exists")
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return nil, err
	}

	// Create new user
	newUser := &models.User{
		TripIDs:          make([]primitive.ObjectID, 0),
		FriendIDs:        make([]primitive.ObjectID, 0),
		FriendRequestIDs: make([]primitive.ObjectID, 0),
		Username:         user.Username,
		PassHash:         string(hashedPasswordBytes),
		Email:            user.Email,
		InvoiceIDs:       make([]primitive.ObjectID, 0),
		LastLogin:        primitive.DateTime(0),
	}

	document, err := database["UserDetails"].InsertDocument(newUser, "User")

	if err != nil {
		return nil, err
	}

	insertedUser, ok := document.(*models.User)

	if !ok {
		return nil, errors.New("failed to convert model to User")
	}

	return insertedUser, nil
}

func GetUser(user models.User, database db.Database) (*models.User, error) {
	// TODO: Implement get user business logic

	return nil, nil
}

func EditUser(user models.User, database db.Database) (*models.User, error) {
	// TODO: Implement edit user business logic

	return nil, nil
}

func DeleteUser(user models.User, database db.Database) error {
	// Acquire reference to user
	document, err := database["UserDetails"].FindDocument(bson.M{"Username": user.Username}, "User")

	if err != nil {
		return err
	}

	existingUser, ok := document.(*models.User)

	if !ok {
		return errors.New("failed to convert model to User")
	}

	// Modify trips the user is a member of
	for _, tripID := range existingUser.TripIDs {
		// Acquire reference to trip
		document, err := database["TripDetails"].FindDocument(bson.M{"_id": tripID}, "Trip")

		if err != nil {
			return err
		}

		existingTrip, ok := document.(*models.Trip)

		if !ok {
			return errors.New("failed to convert model to Trip")
		}

		if existingUser.ID == existingTrip.TripOwnerID {
			existingTrip.Username = user.Username

			err := DeleteTrip(*existingTrip, database)

			if err != nil {
				return err
			}
		} else {
			// Discard this user from the trip's member list
			found, index := utility.Find(existingTrip.MemberIDs[:], existingUser.ID)

			if !found {
				return errors.New("failed to locate user in list")
			}

			existingTrip.MemberIDs = append(existingTrip.MemberIDs[:index], existingTrip.MemberIDs[index+1:]...)

			// Update trip's document in database
			_, err = database["TripDetails"].UpdateDocument(bson.M{"_id": tripID}, bson.M{"MemberIDs": existingTrip.MemberIDs}, "Trip")

			if err != nil {
				return err
			}
		}
	}

	// Modify users from friends list
	for _, friendID := range existingUser.FriendIDs {
		// Acquire reference to friend
		document, err := database["UserDetails"].FindDocument(bson.M{"_id": friendID}, "User")

		if err != nil {
			return err
		}

		existingFriend, ok := document.(*models.User)

		if !ok {
			return errors.New("failed to convert model to User")
		}

		// Discard this user from other friends list
		found, index := utility.Find(existingFriend.FriendIDs[:], existingUser.ID)

		if !found {
			return errors.New("failed to locate user in list")
		}

		existingFriend.FriendIDs = append(existingFriend.FriendIDs[:index], existingFriend.FriendIDs[index+1:]...)

		// Update friend's document in database
		_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": friendID}, bson.M{"FriendIDs": existingFriend.FriendIDs}, "User")

		if err != nil {
			return nil
		}
	}

	// Remove friend requests involving user
	for _, requestID := range existingUser.FriendRequestIDs {
		// Acquire reference to request
		document, err := database["FriendRequestDetails"].FindDocument(bson.M{"_id": requestID}, "FriendRequest")

		if err != nil {
			return err
		}

		existingRequest, ok := document.(*models.FriendRequest)

		if !ok {
			return errors.New("failed to convert model to FriendRequest")
		}

		if existingRequest.SenderID == existingUser.ID {
			// Acquire reference to recipient
			document, err := database["UserDetails"].FindDocument(bson.M{"_id": existingRequest.TargetID}, "User")

			if err != nil {
				return err
			}

			existingTarget, ok := document.(*models.User)

			if !ok {
				return errors.New("failed to convert model to User")
			}

			// Discard this request from target's friend request list
			found, index := utility.Find(existingTarget.FriendRequestIDs[:], requestID)

			if !found {
				return errors.New("failed to locate request in list")
			}

			existingTarget.FriendRequestIDs = append(existingTarget.FriendRequestIDs[:index], existingTarget.FriendRequestIDs[index+1:]...)

			// Update target's document in database
			_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingTarget.ID}, bson.M{"FriendRequestIDs": existingTarget.FriendRequestIDs}, "User")

			if err != nil {
				return err
			}
		} else {
			// Acquire reference to sender
			document, err := database["UserDetails"].FindDocument(bson.M{"_id": existingRequest.SenderID}, "User")

			if err != nil {
				return err
			}

			existingSender, ok := document.(*models.User)

			if !ok {
				return errors.New("failed to convert model to User")
			}

			// Discard this request from sender's friend request list
			found, index := utility.Find(existingSender.FriendRequestIDs[:], requestID)

			if !found {
				return errors.New("failed to locate request in list")
			}

			existingSender.FriendRequestIDs = append(existingSender.FriendRequestIDs[:index], existingSender.FriendRequestIDs[index+1:]...)

			// Update sender's document in database
			_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingSender.ID}, bson.M{"FriendRequestIDs": existingSender.FriendRequestIDs}, "User")

			if err != nil {
				return err
			}
		}

		// Remove request from database
		err = database["FriendRequestDetails"].DeleteDocument(bson.M{"_id": requestID}, "FriendRequest")

		if err != nil {
			return err
		}
	}

	// Remove invoices assigned to user
	for _, invoiceID := range existingUser.InvoiceIDs {
		// Acquire reference to invoice
		document, err := database["InvoiceDetails"].FindDocument(bson.M{"_id": invoiceID}, "Invoice")

		if err != nil {
			return err
		}

		existingInvoice, ok := document.(*models.Invoice)

		if !ok {
			return errors.New("failed to convert model to Invoice")
		}

		// Remove invoice from parent expense if it hasn't been paid
		if !existingInvoice.IsPaid {
			// Acquire reference to invoice's parent expense
			document, err = database["ExpenseDetails"].FindDocument(bson.M{"_id": existingInvoice.ParentExpenseID}, "Expense")

			if err != nil {
				return err
			}

			existingExpense, ok := document.(*models.Expense)

			if !ok {
				return errors.New("failed to convert model to Expense")
			}

			// Discard this invoice from expense's invoice list
			found, index := utility.Find(existingExpense.InvoiceIDs[:], invoiceID)

			if !found {
				return errors.New("failed to locate invoice in list")
			}

			existingExpense.InvoiceIDs = append(existingExpense.InvoiceIDs[:index], existingExpense.InvoiceIDs[index+1:]...)

			// Update expense's document in database
			_, err = database["ExpenseDetails"].UpdateDocument(bson.M{"_id": existingExpense.ID}, bson.M{"InvoiceIDs": existingExpense.InvoiceIDs}, "Expense")

			if err != nil {
				return err
			}

			// Remove invoice from database
			err = database["InvoiceDetails"].DeleteDocument(bson.M{"_id": invoiceID}, "Invoice")

			if err != nil {
				return err
			}
		}
	}

	return nil
}
