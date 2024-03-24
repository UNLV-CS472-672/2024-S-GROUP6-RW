package handlers

import (
	"backend/db"
	"backend/models"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func GetProfileHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to acquire profile details.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to user. Exit handler
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Acquire user document from database
	if err := user.GetDocument(c, UserDetails, bson.M{"Username": user.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	// Acquire connection to 'ProfileDetails' collection on MongoDB
	ProfileDetails := db.ConnectToMongoDB("User", "ProfileDetails")

	var profile models.Profile

	// Acquire profile document from database
	if err := profile.GetDocument(c, ProfileDetails, bson.M{"Username": user.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get profile document. Exit handler
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, map[string]any{
		"DisplayName": profile.DisplayName,
		"Joined":      profile.Joined,
		"About":       profile.About,
	})
}

func EditProfileHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit a profile.\n", time.Now())

	// TODO: Implement profile edit behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteProfileHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete a profile.\n", time.Now())

	var profile models.Profile

	if !models.BindData(c, &profile) {
		return // Failed to bind data to profile. Exit handler
	}

	// Acquire connection to 'ProfileDetails' collection on MongoDB
	ProfileDetails := db.ConnectToMongoDB("User", "ProfileDetails")

	// Acquire profile document from database
	if err := profile.GetDocument(c, ProfileDetails, bson.M{"Username": profile.Username}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to get profile document. Exit handler
	}

	fmt.Println("Deleting profile.")

	_, err := ProfileDetails.DeleteOne(context.TODO(), bson.M{"_id": profile.ID})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to delete profile document. Exit handler
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
