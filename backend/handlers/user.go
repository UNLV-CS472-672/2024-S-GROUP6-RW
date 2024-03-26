package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func DeleteUserHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete a user.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to user
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Acquire user entry from database
	if err := user.GetDocument(c, UserDetails, bson.M{"Username": user.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	fmt.Println("Removing user from trips.")

	// Acquire connection to 'TripDetails' collection on MongoDB
	TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// Remove user from any trips they are a member of
	for _, tripID := range user.TripIDs {
		var trip models.Trip

		// Acquire trip entry from database
		if err := trip.GetDocument(c, TripDetails, bson.M{"_id": tripID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get trip document. Exit handler
		}

		// Locate user in trip's member list
		found, index := utility.Find(trip.MemberIDs[:], user.ID)

		if !found {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user in member list."})
			return // Failed to find user in member list for trip. Exit handler
		}

		// Determine if user owns the trip or not
		if trip.TripOwnerID != user.ID {
			// User is not the trip owner; Remove user from trip's member list
			trip.MemberIDs = append(trip.MemberIDs[:index], trip.MemberIDs[index+1:]...)

			// Update the trip entry in the database
			filter := bson.M{"_id": tripID}

			update := bson.M{"$set": bson.M{
				"MemberIDs": trip.MemberIDs,
			}}

			_, err := TripDetails.UpdateOne(context.TODO(), filter, update)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to update trip. Exit handler
			}
		} else {
			// User is the trip owner; Remove the trip entry from the database
			_, err := TripDetails.DeleteOne(context.TODO(), bson.M{"_id": tripID})

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to delete trip. Exit handler
			}

			// Remove reference to trip from all members
			for _, memberID := range trip.MemberIDs {
				var member models.User

				// Acquire member entry from database
				if err := member.GetDocument(c, UserDetails, bson.M{"_id": memberID}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get member document. Exit handler
				}

				// Locate trip in member's trip list
				found, index := utility.Find(member.TripIDs[:], tripID)

				if !found {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find trip in member's trip list."})
					return // Failed to find trip in member's trip list. Exit handler
				}

				// Remove trip from member's trip list
				member.TripIDs = append(member.TripIDs[:index], member.TripIDs[index+1:]...)

				// Update user entry in database
				filter := bson.M{"_id": memberID}

				update := bson.M{"$set": bson.M{
					"TripIDs": member.TripIDs,
				}}

				_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to update member. Exit handler
				}
			}

			// Acquire connection to 'ActivityDetails' collection on MongoDB
			ActivityDetails := db.ConnectToMongoDB("Trip", "ActivityDetails")

			// Delete activities associated with trip
			for _, activityID := range trip.ActivityIDs {
				var activity models.Activity

				// Acquire activity document from database
				if err := activity.GetDocument(c, ActivityDetails, bson.M{"_id": activityID}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get activity document. Exit handler
				}

				// Remove activity entry from database
				_, err := ActivityDetails.DeleteOne(context.TODO(), bson.M{"_id": activityID})

				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to delete activity. Exit handler
				}
			}

			// Acquire connection to 'ExpenseDetails' collection on MongoDB
			ExpenseDetails := db.ConnectToMongoDB("Finance", "ExpenseDetails")

			// Acquire connection to 'InvoiceDetails' collection on MongoDB
			InvoiceDetails := db.ConnectToMongoDB("Finance", "InvoiceDetails")

			// Delete expenses associated with trip
			for _, expenseID := range trip.ExpenseIDs {
				var expense models.Expense

				// Acquire expense document from database
				if err := expense.GetDocument(c, ExpenseDetails, bson.M{"_id": expenseID}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get expense document. Exit handler
				}

				// Remove expense entry from database
				_, err := ExpenseDetails.DeleteOne(context.TODO(), bson.M{"_id": expenseID})

				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to delete expense. Exit handler
				}

				// Delete invoices associated with expense
				for _, invoiceID := range expense.InvoiceIDs {
					var invoice models.Invoice

					// Acquire invoice document from database
					if err := invoice.GetDocument(c, InvoiceDetails, bson.M{"_id": invoiceID}); err != nil {
						c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
						return // Failed to get invoice document. Exit handler
					}

					_, err := InvoiceDetails.DeleteOne(context.TODO(), bson.M{"_id": invoiceID})

					if err != nil {
						c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
						return // Failed to delete invoice. Exit handler
					}

					var payee models.User

					// Acquire payee document from database
					if err := payee.GetDocument(c, UserDetails, bson.M{"_id": invoice.PayeeID}); err != nil {
						c.JSON(http.StatusInsufficientStorage, gin.H{"error": err.Error()})
						return // Failed to get payee document. Exit handler
					}

					// Locate invoice in payee's invoice list
					found, index := utility.Find(payee.InvoiceIDs[:], invoiceID)

					if !found {
						c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find invoice in payee's invoice list."})
						return // Failed to find invoice in payee's invoice list. Exit handler
					}

					// Remove invoice from payee's invoice list
					payee.InvoiceIDs = append(payee.InvoiceIDs[:index], payee.InvoiceIDs[index+1:]...)

					// Update payee entry in database
					filter := bson.M{"_id": payee.ID}

					update := bson.M{"$set": bson.M{
						"InvoiceIDs": payee.InvoiceIDs,
					}}

					_, err = UserDetails.UpdateOne(context.TODO(), filter, update)

					if err != nil {
						c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
						return // Failed to update payee. Exit handler
					}
				}
			}
		}
	}

	// Acquire connection to 'ExpenseDetails' collection on MongoDB
	ExpenseDetails := db.ConnectToMongoDB("Finance", "ExpenseDetails")

	// Acquire connection to 'InvoiceDetails' collection on MongoDB
	InvoiceDetails := db.ConnectToMongoDB("Finance", "InvoiceDetails")

	fmt.Println("Deleting user's invoices.")

	// Remove invoices that the user is responsible for
	// NOTE: May change semantic requirement in the future
	// Do deleted users still have a responsibility for payment? Hard to track
	// financial information for nonexistent users -- preserve email?
	for _, invoiceID := range user.InvoiceIDs {
		var invoice models.Invoice

		// Acquire invoice document from database
		if err := invoice.GetDocument(c, InvoiceDetails, bson.M{"_id": invoiceID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get invoice document. Exit handler
		}

		var expense models.Expense

		// Acquire expense document from database
		if err := expense.GetDocument(c, ExpenseDetails, bson.M{"_id": invoice.ParentExpenseID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get expense document. Exit handler
		}

		// Locate invoice in expense's invoice list
		found, index := utility.Find(expense.InvoiceIDs[:], invoiceID)

		if !found {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find invoice in parent expense's invoice list."})
			return // Failed to find invoice in parent expense's invoice list. Exit handler
		}

		// Remove invoice from expense's invoice list
		expense.InvoiceIDs = append(expense.InvoiceIDs[:index], expense.InvoiceIDs[index+1:]...)

		// Update expense entry in database
		filter := bson.M{"_id": expense.ID}

		update := bson.M{"$set": bson.M{
			"InvoiceIDs": expense.InvoiceIDs,
		}}

		_, err := ExpenseDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to update expense. Exit handler
		}

		// Remove invoice entry from database
		_, err = InvoiceDetails.DeleteOne(context.TODO(), gin.H{"_id": invoiceID})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to delete invoice. Exit handler
		}
	}

	fmt.Println("Removing user from other friend lists.")

	// Update friends lists involving user
	for _, friendID := range user.FriendIDs {
		var friend models.User

		// Acquire friend document from database
		if err := friend.GetDocument(c, UserDetails, bson.M{"_id": friendID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get friend document. Exit handler
		}

		// Locate user in friend's friend list
		found, index := utility.Find(friend.FriendIDs[:], user.ID)

		if !found {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user in friend ID list."})
			return // Failed to find user in friend ID list. Exit handler
		}

		// Remove user from friend's friend list
		friend.FriendIDs = append(friend.FriendIDs[:index], friend.FriendIDs[index+1:]...)

		// Update friend entry in database
		filter := bson.M{"_id": friendID}

		update := bson.M{"$set": bson.M{
			"FriendIDs": friend.FriendIDs,
		}}

		_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to update friend. Exit handler
		}
	}

	fmt.Println("Deleting friend requests targeted at user.")

	// Acquire connection to 'FriendRequestDetails' collection on MongoDB
	FriendRequestDetails := db.ConnectToMongoDB("User", "FriendRequestDetails")

	// Delete friend requests targeting user
	for _, requestID := range user.FriendRequestIDs {
		var request models.FriendRequest

		// Acquire request document from database
		if err := request.GetDocument(c, FriendRequestDetails, bson.M{"_id": requestID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get friend request document. Exit handler
		}

		// Remove request document from database
		_, err := FriendRequestDetails.DeleteOne(context.TODO(), bson.M{"_id": requestID})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to delete request. Exit handler
		}
	}

	fmt.Println("Deleting user's outgoing friend requests.")

	_, err := FriendRequestDetails.DeleteMany(context.TODO(), bson.M{"SenderID": user.ID})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to delete friend requests from user. Exit handler
	}

	fmt.Println("Deleting user.")

	// Remove user entry from database
	_, err = UserDetails.DeleteOne(context.TODO(), bson.M{"_id": user.ID})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to delete user. Exit handler
	}

	// NOTE: May not need to delete profile if we are keeping it up for whatever
	// reason. Possibly just marking the user as deleted may be a solution
	fmt.Println("Deleting profile.")

	// Acquire connection to 'ProfileDetails' collection on MongoDB
	ProfileDetails := db.ConnectToMongoDB("User", "ProfileDetails")

	// Remove profile entry from database
	_, err = ProfileDetails.DeleteOne(context.TODO(), bson.M{"Username": user.Username})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to delete profile. Exit handler
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
