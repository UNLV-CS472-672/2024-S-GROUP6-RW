// 2024-S-GROUP6-RW\backend\main.go

package main

import (
	"backend/handlers"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Printf("Current Time: %s\n", time.Now())

	r := gin.Default()
	r.Use(cors.Default()) // Setup CORS middleware as needed

	// Set up JWT authentication
	handlers.JWTSetup()

	// User Entry Point
	r.POST("/signin", handlers.SignInHandler)
	r.POST("/register", handlers.RegisterHandler)

	// User Interface
	r.POST("/add_friend", handlers.AddFriendHandler)
	r.POST("/get_friend_requests", handlers.GetFriendRequestsHandler)
	r.POST("/get_friends", handlers.GetFriendsHandler)
	r.POST("/acknowledge_friend_request", handlers.AcknowledgeFriendRequestHandler)
	r.POST("/delete_user", handlers.DeleteUserHandler)

	// Profile Interface
	r.POST("/get_profile", handlers.GetProfileHandler)
	r.POST("/edit_profile", handlers.EditProfileHandler)
	// Dependent on if we delete the profile when we delete the user
	// r.POST("/delete_profile", handlers.DeleteProfileHandler)

	// Trip Interface
	r.POST("/create_trip", handlers.CreateTripHandler)
	r.POST("/get_all_trips", handlers.GetAllTripsHandler)
	r.POST("/get_trip_details", handlers.GetTripDetailsHandler)
	r.POST("/edit_trip", handlers.EditTripHandler)
	r.POST("/delete_trip", handlers.DeleteTripHandler)

	// Activity Interface
	r.POST("/create_activity", handlers.CreateActivityHandler)
	r.POST("/get_activity", handlers.GetActivityHandler)
	r.POST("/edit_activity", handlers.EditActivityHandler)
	r.POST("/delete_activity", handlers.DeleteActivityHandler)

	// Expense Interface
	r.POST("/create_expense", handlers.CreateExpenseHandler)
	r.POST("/get_expense", handlers.GetExpenseHandler)
	r.POST("/edit_expense", handlers.EditExpenseHandler)
	r.POST("/delete_expense", handlers.DeleteExpenseHandler)

	// Invoice Interface
	r.POST("/create_invoice", handlers.CreateInvoiceHandler)
	r.POST("/get_invoice", handlers.GetInvoiceHandler)
	r.POST("/edit_invoice", handlers.EditInvoiceHandler)
	r.POST("/delete_invoice", handlers.DeleteInvoiceHandler)

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
