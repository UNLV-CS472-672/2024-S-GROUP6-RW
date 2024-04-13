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

func CreateActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create an activity.\n", time.Now())

	var activity models.Activity

	if !models.BindData(c, &activity) {
		return // Failed to bind data to activity
	}

	database := db.GetMongoDatabase()

	_, err := business.CreateActivity(activity, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetAllActivitiesHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get all activities.\n", time.Now())

	var trip models.Trip

	if !models.BindData(c, &trip) {
		return // Failed to bind data to activity
	}

	database := db.GetMongoDatabase()

	activityList, err := business.GetAllActivities(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, activityList)
}

func GetActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get activity details.\n", time.Now())

	var activity models.Activity

	if !models.BindData(c, &activity) {
		return // Failed to bind data to activity
	}

	database := db.GetMongoDatabase()

	activityResult, err := business.GetActivity(activity, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, activityResult)
}

func EditActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit an activity.\n", time.Now())

	var activity models.Activity

	if !models.BindData(c, &activity) {
		return // Failed to bind data to activity
	}

	database := db.GetMongoDatabase()

	_, err := business.EditActivity(activity, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete an activity.\n", time.Now())

	var activity models.Activity

	if !models.BindData(c, &activity) {
		return // Failed to bind data to activity
	}

	database := db.GetMongoDatabase()

	err := business.DeleteActivity(activity, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
