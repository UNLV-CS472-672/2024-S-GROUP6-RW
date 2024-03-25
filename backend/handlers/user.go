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
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddFriendHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create a friend request.\n", time.Now())

	var request models.FriendRequest

	if !models.BindData(c, &request) {
		return // Failed to bind data to request. Exit handler
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	var sender models.User

	// Check that the user who sent the request exists
	if err := sender.GetDocument(c, UserDetails, bson.M{"Username": request.SenderUsername}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return // Failed to get sender document. Exit handler
	}

	var target models.User

	// Check that the user the request is for exists
	if err := target.GetDocument(c, UserDetails, bson.M{"Username": request.TargetUsername}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return // Failed to get target document. Exit handler
	}

	// Acquire connection to 'FriendRequestDetails' collection on MongoDB
	FriendRequestDetails := db.ConnectToMongoDB("User", "FriendRequestDetails")

	var existingRequest models.FriendRequest

	// Check that the friend request does not already exist
	if err := existingRequest.GetDocument(c, FriendRequestDetails, bson.M{"SenderID": sender.ID, "TargetID": target.ID}); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Request already exists."})
		return // Friend request already exists. Exit handler
	}

	fmt.Println("Creating friend request.")

	// Create the new friend request
	RequestID, err := FriendRequestDetails.InsertOne(context.TODO(), bson.M{
		"SenderID": sender.ID,
		"TargetID": target.ID,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to create friend request. Exit handler
	}

	fmt.Println("Adding friend request reference to target user.")

	// Add new request's ID to list of request IDs for target user
	if requestID, ok := RequestID.InsertedID.(primitive.ObjectID); ok {
		target.FriendRequestIDs = append(target.FriendRequestIDs, requestID)
	} else {
		fmt.Println("Failed to convert request ID to ObjectID.")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
		return
	}

	// Update target user's request list
	filter := bson.M{"_id": target.ID}

	update := bson.M{"$set": bson.M{
		"FriendRequestIDs": target.FriendRequestIDs,
	}}

	_, err = UserDetails.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to update target. Exit handler
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetFriendRequestsHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to acquire user's friend requests.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to user. Exit handler
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Acquire existing user entry from database
	if err := user.GetDocument(c, UserDetails, bson.M{"Username": user.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	// Acquire connection to 'FriendRequestDetals' collection on MongoDB
	FriendRequestDetals := db.ConnectToMongoDB("User", "FriendRequestDetails")

	// Collect requests targeted at the specified user
	requestList := make([]map[string]any, 0)

	for _, requestID := range user.FriendRequestIDs {
		var request models.FriendRequest

		// Acquire request entry from database
		if err := request.GetDocument(c, FriendRequestDetals, bson.M{"_id": requestID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get request document. Exit handler
		}

		var sender models.User

		// Acquire sender entry from database
		if err := sender.GetDocument(c, UserDetails, bson.M{"_id": request.SenderID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get sender document. Exit handler
		}

		// Add sender's username to the request list
		// NOTE: More information may be needed, so this is set up for future changes
		requestList = append(requestList, map[string]any{
			"SenderUsername": sender.Username,
		})
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, requestList)
}

func GetFriendsHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to acquire user's friends list.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to user.
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Acquire existing user entry from database
	if err := user.GetDocument(c, UserDetails, bson.M{"Username": user.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	fmt.Println("Acquiring user's friends.")

	// Collect list of usernames from user's friends list
	friendList := make([]string, 0)

	for _, friendID := range user.FriendIDs {
		var friend models.User

		// Acquire friend user entry from database
		if err := friend.GetDocument(c, UserDetails, bson.M{"_id": friendID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get friend document. Exit handler
		}

		// Add friend's username to friend list
		friendList = append(friendList, friend.Username)
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, friendList)
}

func AcknowledgeFriendRequestHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to acknowledge a friend request.\n", time.Now())

	var request models.FriendRequest

	if !models.BindData(c, &request) {
		return // Failed to bind data to request. Exit handler
	}

	ackState := request.AcceptRequest

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	var sender models.User

	// Acquire sender user entry from database
	if err := sender.GetDocument(c, UserDetails, bson.M{"Username": request.SenderUsername}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get sender document. Exit handler
	}

	var target models.User

	// Acquire target user entry from database
	if err := target.GetDocument(c, UserDetails, bson.M{"Username": request.TargetUsername}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get target document. Exit handler
	}

	// Acquire connection to 'FriendRequestDetails' collection on MongoDB
	FriendRequestDetails := db.ConnectToMongoDB("User", "FriendRequestDetails")

	// Acquire existing request entry from database
	if err := request.GetDocument(c, FriendRequestDetails, bson.M{"SenderID": sender.ID, "TargetID": target.ID}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get request document. Exit handler
	}

	blocked := false // block list not yet implemented; for now assume not blocked

	// Acknowledge the friend request
	if !blocked && ackState {
		fmt.Println("Accepting friend request.")

		// Accepted; Add friends
		sender.FriendIDs = append(sender.FriendIDs, target.ID)
		target.FriendIDs = append(target.FriendIDs, sender.ID)

		// Locate this request in the target user's request ID list
		found, index := utility.Find(target.FriendRequestIDs[:], request.ID)

		if !found {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find request ID in target's request list."})
			return // Failed to find request ID in target's request list. Exit handler
		}

		// Remove this request from the target user's request ID list
		target.FriendRequestIDs = append(target.FriendRequestIDs[:index], target.FriendRequestIDs[index+1:]...)

		// Update sender user entry in database
		filter := bson.M{"_id": sender.ID}

		update := bson.M{"$set": bson.M{
			"FriendIDs": sender.FriendIDs,
		}}

		_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to update sender. Exit handler
		}

		// Update target user entry in database
		filter = bson.M{"_id": target.ID}

		update = bson.M{"$set": bson.M{
			"FriendIDs":        target.FriendIDs,
			"FriendRequestIDs": target.FriendRequestIDs,
		}}

		_, err = UserDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to update target. Exit handler
		}

		// Remove friend request entry from database
		_, err = FriendRequestDetails.DeleteOne(context.TODO(), bson.M{"_id": request.ID})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to delete friend request
		}
	} else if !ackState {
		fmt.Println("Rejecting friend request.")

		// Rejected; Remove request entry from database
		_, err := FriendRequestDetails.DeleteOne(context.TODO(), bson.M{"_id": request.ID})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to delete friend request
		}

		// Locate this request in the target user's request ID list
		found, index := utility.Find(target.FriendRequestIDs[:], request.ID)

		if !found {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find request ID in target's request list."})
			return // Failed to find request ID in target's request list. Exit handler
		}

		// Remove this request from the target user's request ID list
		target.FriendRequestIDs = append(target.FriendRequestIDs[:index], target.FriendRequestIDs[index+1:]...)

		// Update target user entry in database
		filter := bson.M{"_id": target.ID}

		update := bson.M{"$set": bson.M{
			"FriendRequestIDs": target.FriendRequestIDs,
		}}

		_, err = UserDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to update target. Exit handler
		}

	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

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
