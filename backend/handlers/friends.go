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
	if !blocked && request.AcceptRequest {
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
	} else if !request.AcceptRequest {
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
