package handlers

import (
	"fmt"
	"context"
	"net/http"

	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"

	"time"
)

func CreateTripHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create a trip.\n", time.Now())

	// 'Trip' struct instance to store HTTP request body content
	var trip models.Trip

	// Bind JSON body to struct
	if err := c.BindJSON(&trip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Acquire connection to 'UserDetails' collection on MongoDB
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Locate user entry associated with trip creation
	var user_result bson.M
	err := UserDetails.FindOne(context.TODO(), bson.M{"Username": trip.Username}).Decode(&user_result)

	fmt.Println(user_result)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not find user information."})
		return
	} else {
		fmt.Println("User found.")
	}

	// Acquire connection to 'TripDetails' collection on MongoDB
	// TripDetails := db.ConnectToMongoDB("Trip", "TripDetails")

	// Send OK status back to client
	c.JSON(http.StatusOK, gin.H{})
}
