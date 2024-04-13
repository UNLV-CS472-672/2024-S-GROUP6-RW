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

func GetProfileHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to acquire profile details.\n", time.Now())

	var profile models.Profile

	if !models.BindData(c, &profile) {
		return // Failed to bind data to user. Exit handler
	}

	database := db.GetMongoDatabase()

	profileResult, err := business.GetProfile(profile, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, profileResult)
}

func EditProfileHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit a profile.\n", time.Now())

	var profile models.Profile

	if !models.BindData(c, &profile) {
		return // Failed to bind data to profile. Exit handler
	}

	database := db.GetMongoDatabase()

	_, err := business.EditProfile(profile, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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

	database := db.GetMongoDatabase()

	err := business.DeleteProfile(profile, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
