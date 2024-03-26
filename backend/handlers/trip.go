package handlers

import (
	"fmt"
	"net/http"

	"backend/business"
	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"

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

	database := db.GetMongoDatabase()

	_, err := business.CreateTrip(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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

	database := db.GetMongoDatabase()

	tripList, err := business.GetAllTrips(user, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// TODO: Replace ID content in each trip textual data from respective documents

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, tripList)
}

func GetTripHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get details for a trip.\n", time.Now())

	// Store request data into Trip instance
	var trip models.Trip

	// Bind JSON body to trip
	if !models.BindData(c, &trip) {
		return
	}

	database := db.GetMongoDatabase()

	tripResult, err := business.GetTrip(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, tripResult)
}

func EditTripHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit a trip.\n", time.Now())

	// Store request data into Trip instance
	var trip models.Trip

	// Bind JSON body to Trip
	if !models.BindData(c, &trip) {
		return
	}

	database := db.GetMongoDatabase()

	_, err := business.EditTrip(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// // Acquire connection to 'UserDetails' collection on MongoDB
	// UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// // Locate user entry associated with request details
	// var user models.User

	// if err := user.GetDocument(c, UserDetails, bson.M{"Username": trip.Username}); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return // Failed to get user document. Exit handler
	// }

	// // Acquire connection to 'TripDetails' collection on MongoDB
	// TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// // Verify that a trip of the same title exists
	// var existingTrip models.Trip

	// if err := existingTrip.GetDocument(c, TripDetails, bson.M{"TripOwnerID": user.ID, "TripTitle": trip.TripTitle}); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 	return // Failed to get existing trip document. Exit handler
	// }

	// fmt.Println("Detecting changes to trip.")

	// // Create new trip from modification data
	// var newTrip models.Trip

	// // Process requested modifications, and overwrite existing data for new Trip
	// modifyTitle := false
	// modifyName := false
	// modifyMembers := false

	// for _, entry := range trip.Modifications {
	// 	switch entry.FieldName {
	// 	case "TripTitle":
	// 		tripTitle, ok := entry.Data.(string)

	// 		if !ok {
	// 			fmt.Println("Could not convert Data field to string.")
	// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
	// 			return
	// 		}

	// 		// Determine if modifications to trip title were made
	// 		if newTrip.TripTitle != tripTitle {
	// 			modifyTitle = true
	// 			newTrip.TripTitle = tripTitle
	// 		}
	// 	case "LocationName":
	// 		locationName, ok := entry.Data.(string)

	// 		if !ok {
	// 			fmt.Println("Could not convert Data field to string.")
	// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
	// 			return
	// 		}

	// 		// Determine if modifications to location name were made
	// 		if newTrip.LocationName != locationName {
	// 			modifyName = true
	// 			newTrip.LocationName = locationName
	// 		}
	// 	case "TripMembers":
	// 		usernameList, ok := entry.Data.([]interface{})

	// 		if !ok {
	// 			fmt.Println("Could not convert Data field to []interface{}.")
	// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
	// 			return
	// 		}

	// 		// Acquire user IDs for all valid usernames
	// 		for _, value := range usernameList {
	// 			username, ok := value.(string)

	// 			if !ok {
	// 				fmt.Println("Could not convert member username to string.")
	// 				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve data."})
	// 				return
	// 			}

	// 			var member models.User

	// 			if err := member.GetDocument(c, UserDetails, bson.M{"Username": username}); err != nil {
	// 				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 				return // Failed to get member document. Exit handler
	// 			}

	// 			newTrip.MemberIDs = append(newTrip.MemberIDs, member.ID)
	// 		}

	// 		// Determine if modifications to member list were made
	// 		if !utility.UnorderedEquals(existingTrip.MemberIDs, newTrip.MemberIDs) {
	// 			modifyMembers = true
	// 		}
	// 	default:
	// 		fmt.Printf("Invalid Field: \"%s\"\n", entry.FieldName)
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request field: \"" + entry.FieldName + "\""})
	// 		return
	// 	}
	// }

	// // Only update if changes actually happened
	// if modifyTitle || modifyName || modifyMembers {

	// 	// Make changes from modification request
	// 	filter := bson.M{"_id": existingTrip.ID}

	// 	var update = make(bson.M)
	// 	var content = make(bson.M)

	// 	if modifyTitle {
	// 		fmt.Println("Updating trip title.")
	// 		content["TripTitle"] = newTrip.TripTitle
	// 	}

	// 	if modifyName {
	// 		fmt.Println("Updating location name.")
	// 		content["LocationName"] = newTrip.LocationName
	// 	}

	// 	if modifyMembers {
	// 		fmt.Println("Updating member list.")

	// 		// If owner is not found in member list before update, then owner has been removed
	// 		if found, _ := utility.Find(newTrip.MemberIDs[:], existingTrip.TripOwnerID); !found {
	// 			fmt.Println("Invalid operation: Tried to remove trip owner from member list.")
	// 			c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot remove trip owner from member list."})
	// 			return
	// 		}

	// 		content["MemberIDs"] = newTrip.MemberIDs
	// 	}

	// 	update["$set"] = content

	// 	// Attempt to update existing Trip document in database
	// 	_, err := TripDetails.UpdateOne(context.TODO(), filter, update)

	// 	if err != nil {
	// 		fmt.Println("Error: " + err.Error())
	// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update trip."})
	// 		return
	// 	}
	// } else {
	// 	fmt.Println("No changes were made.")
	// }

	// // Determine if modifications to member list were made
	// if modifyMembers {
	// 	fmt.Println("Trip member list has been modified. Updating relevant users.")

	// 	for _, id := range existingTrip.MemberIDs {
	// 		found, _ := utility.Find(newTrip.MemberIDs[:], id)

	// 		if !found {
	// 			// Remove reference to trip from this user
	// 			var existingMember models.User

	// 			if err := existingMember.GetDocument(c, UserDetails, bson.M{"_id": id}); err != nil {
	// 				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 				return // Failed to get existing member document. Exit handler
	// 			}

	// 			// Remove this trip to member's trip list
	// 			if found, index := utility.Find(existingMember.TripIDs[:], existingTrip.ID); found {
	// 				// Reconstruct trip ID list by concatenating sublists on either side of this trip
	// 				existingMember.TripIDs = append(existingMember.TripIDs[:index], existingMember.TripIDs[index+1:]...)
	// 			}

	// 			// Update user
	// 			filter := bson.M{"_id": id}

	// 			update := bson.M{"$set": bson.M{
	// 				"TripIDs": existingMember.TripIDs,
	// 			}}

	// 			_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

	// 			if err != nil {
	// 				fmt.Println("Error: " + err.Error())
	// 				c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user."})
	// 				return
	// 			}
	// 		}
	// 	}

	// 	for _, id := range newTrip.MemberIDs {
	// 		found, _ := utility.Find(existingTrip.MemberIDs[:], id)

	// 		if !found {
	// 			// Add reference to trip to this user
	// 			var newMember models.User

	// 			if err := newMember.GetDocument(c, UserDetails, bson.M{"_id": id}); err != nil {
	// 				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 				return // Failed to get new member document. Exit handler
	// 			}

	// 			// Add this trip to member's trip list
	// 			newMember.TripIDs = append(newMember.TripIDs, existingTrip.ID)

	// 			// Update user
	// 			filter := bson.M{"_id": id}

	// 			update := bson.M{"$set": bson.M{
	// 				"TripIDs": newMember.TripIDs,
	// 			}}

	// 			_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

	// 			if err != nil {
	// 				fmt.Println("Error: " + err.Error())
	// 				c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user."})
	// 				return
	// 			}
	// 		}
	// 	}
	// }

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

	database := db.GetMongoDatabase()

	err := business.DeleteTrip(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Send OK status back to client
	c.JSON(http.StatusOK, gin.H{})
}
