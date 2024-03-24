package handlers

import (
	"context"
	"fmt"
	"net/http"

	"backend/db"
	"backend/models"
	"backend/utility"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"time"
)

func CreateTripHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create a trip.\n", time.Now())

	// Store request data into Trip instance
	var trip models.Trip

	// Bind JSON body to Trip
	if !models.BindData(c, &trip) {
		return // Failed to bind data. Exit handler
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	var user models.User

	// Acquire user document from database
	if err := user.GetDocument(c, UserDetails, bson.M{"Username": trip.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	// Acquire connection to 'TripDetails' collection on MongoDB
	TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	var existingTrip models.Trip

	// Verify that a trip of the same title does not already exist
	if err := existingTrip.GetDocument(c, TripDetails, bson.M{"TripOwnerID": user.ID, "TripTitle": trip.TripTitle}); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trip already exists."})
		return // Acquired an existing trip document. Exit handler
	}

	fmt.Println("Creating new trip.")

	// Create new trip
	insert_result, err := TripDetails.InsertOne(context.TODO(), bson.M{
		"TripOwnerID":  user.ID,
		"TripTitle":    trip.TripTitle,
		"LocationName": trip.LocationName,
		"MemberIDs":    []primitive.ObjectID{user.ID},
		"ActivityIDs":  make([]primitive.ObjectID, 0),
		"ExpenseIDs":   make([]primitive.ObjectID, 0),
	})

	if err != nil {
		fmt.Println("Error: " + err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create trip."})
		return
	}

	fmt.Println("Adding trip to user.")

	// Add new Trip ID to list
	if tripID, ok := insert_result.InsertedID.(primitive.ObjectID); ok {
		user.TripIDs = append(user.TripIDs, tripID)
	} else {
		fmt.Println("Failed to convert Trip ID to ObjectID.")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve Trip ID."})
		return
	}

	// Update user with additional Trip ID
	filter := bson.M{"_id": user.ID}

	update := bson.M{"$set": bson.M{
		"TripIDs": user.TripIDs,
	}}

	_, err = UserDetails.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		fmt.Println("Error: " + err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user."})
		return
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetAllTripsHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get trips for user.\n", time.Now())

	// Store request data into User instance
	var user models.User

	// Bind JSON body to User
	if !models.BindData(c, &user) {
		return // Failed to bind data. Exit handler
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Locate user entry associated with trip creation
	if err := user.GetDocument(c, UserDetails, bson.M{"Username": user.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	fmt.Println("Acquiring user trips.")

	// Acquire connection to 'UserDetails' collection on MongoDB
	TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// Get information for all trips the user is in
	tripList := make([]map[string]any, 0)

	for _, id := range user.TripIDs {
		// Get trips from the user's trip list
		var trip models.Trip
		if err := trip.GetDocument(c, TripDetails, bson.M{"_id": id}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get trip document. Exit handler
		}

		// Find the owner of this trip
		var owner models.User
		if err := owner.GetDocument(c, UserDetails, bson.M{"_id": trip.TripOwnerID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get owner document. Exit handler
		}

		// Collect names of members in trip
		var memberNames []string

		for _, memberID := range trip.MemberIDs {
			// Find information for each member in this trip
			var member models.User

			if err := member.GetDocument(c, UserDetails, bson.M{"_id": memberID}); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to get member document. Exit handler
			}

			memberNames = append(memberNames, member.Username)
		}

		// Acquire connection to 'ActivityDetails' collection on MongoDB
		ActivityDetails := db.ConnectToMongoDB("Trip", "ActivityDetails")

		// Collect list of activities
		activityList := make([]map[string]any, 0)

		for _, activityID := range trip.ActivityIDs {
			// Find information for each activity in this trip
			var activity models.Activity

			if err := activity.GetDocument(c, ActivityDetails, bson.M{"_id": activityID}); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to get activity document. Exit handler
			}

			activityList = append(activityList, map[string]any{
				"Description":  activity.Description,
				"Date":         activity.Date,
				"ImageURI":     activity.ImageURI,
				"IsMapBased":   activity.IsMapBased,
				"LocationName": activity.LocationName,
				"Address":      activity.Address,
				"Coordinate":   activity.Coordinate,
			})
		}

		// Acquire connection to 'ExpenseDetails' collection on MongoDB
		ExpenseDetails := db.ConnectToMongoDB("Finance", "ExpenseDetails")

		// Acquire connection to 'InvoiceDetails' collection on MongoDB
		InvoiceDetails := db.ConnectToMongoDB("Finance", "InvoiceDetails")

		// Collect list of expenses
		expenseList := make([]map[string]any, 0)

		for _, expenseID := range trip.ExpenseIDs {
			// Find information for each expense in this trip
			var expense models.Expense

			if err := expense.GetDocument(c, ExpenseDetails, bson.M{"_id": expenseID}); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to get expense document. Exit handler
			}

			// Collect list of invoices
			invoiceList := make([]map[string]any, 0)

			for _, invoiceID := range expense.InvoiceIDs {
				var invoice models.Invoice

				if err := invoice.GetDocument(c, InvoiceDetails, bson.M{"_id": invoiceID}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get invoice document. Exit handler
				}

				// Find user responsible for invoice
				var payee models.User

				if err := payee.GetDocument(c, UserDetails, bson.M{"_id": invoice.PayeeID}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get payee document. Exit handler
				}

				invoiceList = append(invoiceList, map[string]any{
					"Payee":       payee.Username,
					"Description": invoice.Description,
					"Balance":     invoice.Balance,
				})
			}

			expenseList = append(expenseList, map[string]any{
				"Description":      expense.Description,
				"Amount":           expense.Amount,
				"InvoiceList":      invoiceList,
				"RemainingBalance": expense.RemainingBalance,
				"IsPaid":           expense.IsPaid,
			})
		}

		tripList = append(tripList, map[string]any{
			"TripOwner":    owner.Username,
			"TripTitle":    trip.TripTitle,
			"LocationName": trip.LocationName,
			"MemberList":   memberNames,
			"ActivityList": activityList,
			"ExpenseList":  expenseList,
		})
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, tripList)
}

func GetTripDetailsHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get details for a trip.\n", time.Now())

	// Store request data into Trip instance
	var trip models.Trip

	// Bind JSON body to trip
	if !models.BindData(c, &trip) {
		return
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Find the owner of this trip
	var owner models.User
	if err := owner.GetDocument(c, UserDetails, bson.M{"Username": trip.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get owner document. Exit handler
	}

	// Acquire connection to 'TripDetails' collection on MongoDB
	TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// Acquire information about trip
	if err := trip.GetDocument(c, TripDetails, bson.M{"TripOwnerID": owner.ID, "TripTitle": trip.TripTitle}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get trip document. Exit handler
	}

	// Collect names of members in trip
	var memberList []string

	for _, memberID := range trip.MemberIDs {
		// Find information for each member in this trip
		var member models.User

		if err := member.GetDocument(c, UserDetails, bson.M{"_id": memberID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get member document. Exit handler
		}

		memberList = append(memberList, member.Username)
	}

	// Acquire connection to 'ActivityDetails' collection on MongoDB
	ActivityDetails := db.ConnectToMongoDB("Trip", "ActivityDetails")

	// Collect list of activities
	activityList := make([]map[string]any, 0)

	for _, activityID := range trip.ActivityIDs {
		// Find information for each activity in this trip
		var activity models.Activity

		if err := activity.GetDocument(c, ActivityDetails, bson.M{"_id": activityID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get activity document. Exit handler
		}

		activityList = append(activityList, map[string]any{
			"Description":  activity.Description,
			"Date":         activity.Date,
			"ImageURI":     activity.ImageURI,
			"IsMapBased":   activity.IsMapBased,
			"LocationName": activity.LocationName,
			"Address":      activity.Address,
			"Coordinate":   activity.Coordinate,
		})
	}

	// Acquire connection to 'ExpenseDetails' collection on MongoDB
	ExpenseDetails := db.ConnectToMongoDB("Finance", "ExpenseDetails")

	// Acquire connection to 'InvoiceDetails' collection on MongoDB
	InvoiceDetails := db.ConnectToMongoDB("Finance", "InvoiceDetails")

	// Collect list of expenses
	expenseList := make([]map[string]any, 0)

	for _, expenseID := range trip.ExpenseIDs {
		// Find information for each expense in this trip
		var expense models.Expense

		if err := expense.GetDocument(c, ExpenseDetails, bson.M{"_id": expenseID}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get expense document. Exit handler
		}

		// Collect list of invoices
		invoiceList := make([]map[string]any, 0)

		for _, invoiceID := range expense.InvoiceIDs {
			var invoice models.Invoice

			if err := invoice.GetDocument(c, InvoiceDetails, bson.M{"_id": invoiceID}); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to get invoice document. Exit handler
			}

			// Find user responsible for invoice
			var payee models.User

			if err := payee.GetDocument(c, UserDetails, bson.M{"_id": invoice.PayeeID}); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return // Failed to get payee document. Exit handler
			}

			invoiceList = append(invoiceList, map[string]any{
				"Payee":       payee.Username,
				"Description": invoice.Description,
				"Balance":     invoice.Balance,
			})
		}

		expenseList = append(expenseList, map[string]any{
			"Description":      expense.Description,
			"Amount":           expense.Amount,
			"InvoiceList":      invoiceList,
			"RemainingBalance": expense.RemainingBalance,
			"IsPaid":           expense.IsPaid,
		})
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, map[string]any{
		"TripOwner":    owner.Username,
		"TripTitle":    trip.TripTitle,
		"LocationName": trip.LocationName,
		"MemberList":   memberList,
		"ActivityList": activityList,
		"ExpenseList":  expenseList,
	})
}

func EditTripHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit a trip.\n", time.Now())

	// Store request data into Trip instance
	var trip models.Trip

	// Bind JSON body to Trip
	if !models.BindData(c, &trip) {
		return
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Locate user entry associated with request details
	var user models.User

	if err := user.GetDocument(c, UserDetails, bson.M{"Username": trip.Username}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	// Acquire connection to 'TripDetails' collection on MongoDB
	TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// Verify that a trip of the same title exists
	var existingTrip models.Trip

	if err := existingTrip.GetDocument(c, TripDetails, bson.M{"TripOwnerID": user.ID, "TripTitle": trip.TripTitle}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get existing trip document. Exit handler
	}

	fmt.Println("Detecting changes to trip.")

	// Create new trip from modification data
	var newTrip models.Trip

	// Process requested modifications, and overwrite existing data for new Trip
	modifyTitle := false
	modifyName := false
	modifyMembers := false

	for _, entry := range trip.Modifications {
		switch entry.FieldName {
		case "TripTitle":
			tripTitle, ok := entry.Data.(string)

			if !ok {
				fmt.Println("Could not convert Data field to string.")
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
				return
			}

			// Determine if modifications to trip title were made
			if newTrip.TripTitle != tripTitle {
				modifyTitle = true
				newTrip.TripTitle = tripTitle
			}
		case "LocationName":
			locationName, ok := entry.Data.(string)

			if !ok {
				fmt.Println("Could not convert Data field to string.")
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
				return
			}

			// Determine if modifications to location name were made
			if newTrip.LocationName != locationName {
				modifyName = true
				newTrip.LocationName = locationName
			}
		case "TripMembers":
			usernameList, ok := entry.Data.([]interface{})

			if !ok {
				fmt.Println("Could not convert Data field to []interface{}.")
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
				return
			}

			// Acquire user IDs for all valid usernames
			for _, value := range usernameList {
				username, ok := value.(string)

				if !ok {
					fmt.Println("Could not convert member username to string.")
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
					return
				}

				var member models.User

				if err := member.GetDocument(c, UserDetails, bson.M{"Username": username}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get member document. Exit handler
				}

				newTrip.MemberIDs = append(newTrip.MemberIDs, member.ID)
			}

			// Determine if modifications to member list were made
			if !utility.UnorderedEquals(existingTrip.MemberIDs, newTrip.MemberIDs) {
				modifyMembers = true
			}
		default:
			fmt.Printf("Invalid Field: \"%s\"\n", entry.FieldName)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request field: \"" + entry.FieldName + "\""})
			return
		}
	}

	// Only update if changes actually happened
	if modifyTitle || modifyName || modifyMembers {

		// Make changes from modification request
		filter := bson.M{"_id": existingTrip.ID}

		var update = make(bson.M)
		var content = make(bson.M)

		if modifyTitle {
			fmt.Println("Updating trip title.")
			content["TripTitle"] = newTrip.TripTitle
		}

		if modifyName {
			fmt.Println("Updating location name.")
			content["LocationName"] = newTrip.LocationName
		}

		if modifyMembers {
			fmt.Println("Updating member list.")

			// If owner is not found in member list before update, then owner has been removed
			if found, _ := utility.Find(newTrip.MemberIDs[:], existingTrip.TripOwnerID); !found {
				fmt.Println("Invalid operation: Tried to remove trip owner from member list.")
				c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot remove trip owner from member list."})
				return
			}

			content["MemberIDs"] = newTrip.MemberIDs
		}

		update["$set"] = content

		// Attempt to update existing Trip document in database
		_, err := TripDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			fmt.Println("Error: " + err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update trip."})
			return
		}
	} else {
		fmt.Println("No changes were made.")
	}

	// Determine if modifications to member list were made
	if modifyMembers {
		fmt.Println("Trip member list has been modified. Updating relevant users.")

		for _, id := range existingTrip.MemberIDs {
			found, _ := utility.Find(newTrip.MemberIDs[:], id)

			if !found {
				// Remove reference to trip from this user
				var existingMember models.User

				if err := existingMember.GetDocument(c, UserDetails, bson.M{"_id": id}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get existing member document. Exit handler
				}

				// Remove this trip to member's trip list
				if found, index := utility.Find(existingMember.TripIDs[:], existingTrip.ID); found {
					// Reconstruct trip ID list by concatenating sublists on either side of this trip
					existingMember.TripIDs = append(existingMember.TripIDs[:index], existingMember.TripIDs[index+1:]...)
				}

				// Update user
				filter := bson.M{"_id": id}

				update := bson.M{"$set": bson.M{
					"TripIDs": existingMember.TripIDs,
				}}

				_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

				if err != nil {
					fmt.Println("Error: " + err.Error())
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user."})
					return
				}
			}
		}

		for _, id := range newTrip.MemberIDs {
			found, _ := utility.Find(existingTrip.MemberIDs[:], id)

			if !found {
				// Add reference to trip to this user
				var newMember models.User

				if err := newMember.GetDocument(c, UserDetails, bson.M{"_id": id}); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return // Failed to get new member document. Exit handler
				}

				// Add this trip to member's trip list
				newMember.TripIDs = append(newMember.TripIDs, existingTrip.ID)

				// Update user
				filter := bson.M{"_id": id}

				update := bson.M{"$set": bson.M{
					"TripIDs": newMember.TripIDs,
				}}

				_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

				if err != nil {
					fmt.Println("Error: " + err.Error())
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user."})
					return
				}
			}
		}
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteTripHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete a trip.\n", time.Now())

	// Store request data into Trip instance
	var trip models.Trip

	// Bind JSON body to struct
	if !models.BindData(c, &trip) {
		return // Failed to bind data. Exit handler
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Locate user entry associated with trip creation
	var user models.User

	if err := user.GetDocument(c, UserDetails, bson.M{"Username": trip.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	// Acquire connection to 'TripDetails' collection on MongoDB
	TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// Verify that a trip of the same title exists
	if err := trip.GetDocument(c, TripDetails, bson.M{"TripOwnerID": user.ID, "TripTitle": trip.TripTitle}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get existing trip document. Exit handler
	}

	fmt.Println("Removing members from this trip.")

	// Remove references to this trip from all members prior to deletion
	for _, id := range trip.MemberIDs {
		var existingMember models.User

		if err := existingMember.GetDocument(c, UserDetails, bson.M{"_id": id}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return // Failed to get existing member document. Exit handler
		}

		// Reconstruct trip ID list by excluding this trip
		found, index := utility.Find(existingMember.TripIDs[:], trip.ID)

		if found {
			existingMember.TripIDs = append(existingMember.TripIDs[:index], existingMember.TripIDs[index+1:]...)
		}

		// Update user
		filter := bson.M{"_id": id}

		update := bson.M{"$set": bson.M{
			"TripIDs": existingMember.TripIDs,
		}}

		_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			fmt.Println("Error: " + err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user."})
			return
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

	fmt.Println("Removing trip.")

	// Remove existing trip document from database
	_, err := TripDetails.DeleteOne(context.TODO(), bson.M{"_id": trip.ID})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, gin.H{})
}
