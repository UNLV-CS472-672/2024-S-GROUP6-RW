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

	// TODO: select relavent information from the trips to return to client

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

	// TODO: select relavent information from the trip to return to client

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
