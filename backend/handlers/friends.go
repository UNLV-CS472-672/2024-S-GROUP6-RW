package handlers

import (
	"backend/business"
	"backend/db"
	"backend/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func AddFriendHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create a friend request.\n", time.Now())

	var request models.FriendRequest

	if !models.BindData(c, &request) {
		return // Failed to bind data to request. Exit handler
	}

	database := db.GetMongoDatabase()

	_, err := business.AddFriend(request, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
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

	database := db.GetMongoDatabase()

	requestList, err := business.GetFriendRequests(user, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// TODO: select relavent information from the requests to return to client

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

	database := db.GetMongoDatabase()

	friendList, err := business.GetFriends(user, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// TODO: select relavent information from the friends to return to client

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

	database := db.GetMongoDatabase()

	err := business.AcknowledgeFriendRequest(request, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func RemoveFriendHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to remove a friend.\n", time.Now())

	var request models.FriendRequest

	if !models.BindData(c, &request) {
		return // Failed to bind data to request
	}

	database := db.GetMongoDatabase()

	err := business.RemoveFriend(request, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
