package main

import (
	"backend/business"
	"backend/db"
	"backend/handlers"
	"backend/secrets"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Printf("Current Time: %s\n", time.Now())

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Adjust as needed
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000" // Adjust as needed
		},
		MaxAge: 12 * time.Hour,
	}))

	// Set up ENV data
	err := secrets.LoadEnv()

	if err != nil {
		log.Fatal("Failed to load .env data.")
	}

	// Set up JWT and Mongo with .env values
	err = business.JWTSetup()

	if err != nil {
		log.Fatal("Failed to setup JWT.")
	}

	err = db.MongoSetup()

	if err != nil {
		log.Fatal("Failed to setup Mongo.")
	}

	// User Interface
	r.POST("/register", handlers.RegisterHandler)
	r.POST("/signin", handlers.SignInHandler)
	r.POST("/get_user", handlers.GetUserHandler)
	r.POST("/edit_user", handlers.EditUserHandler)
	r.POST("/delete_user", handlers.DeleteUserHandler)

	// Friend Interface
	r.POST("/add_friend", handlers.AddFriendHandler)
	r.POST("/get_friend_requests", handlers.GetFriendRequestsHandler)
	r.POST("/get_friends", handlers.GetFriendsHandler)
	r.POST("/acknowledge_friend_request", handlers.AcknowledgeFriendRequestHandler)
	r.POST("/remove_friend", handlers.RemoveFriendHandler)

	// Profile Interface
	r.POST("/get_profile", handlers.GetProfileHandler)
	r.POST("/edit_profile", handlers.EditProfileHandler)
	// Dependent on if we delete the profile when we delete the user
	r.POST("/delete_profile", handlers.DeleteProfileHandler)

	// Trip Interface
	r.POST("/create_trip", handlers.CreateTripHandler)
	r.POST("/get_all_trips", handlers.GetAllTripsHandler)
	r.POST("/get_trip", handlers.GetTripHandler)
	r.POST("/edit_trip", handlers.EditTripHandler)
	r.POST("/delete_trip", handlers.DeleteTripHandler)

	// Activity Interface
	r.POST("/create_activity", handlers.CreateActivityHandler)
	r.POST("/get_all_activities", handlers.GetAllActivitiesHandler)
	r.POST("/get_activity", handlers.GetActivityHandler)
	r.POST("/edit_activity", handlers.EditActivityHandler)
	r.POST("/delete_activity", handlers.DeleteActivityHandler)

	// Expense Interface
	r.POST("/create_expense", handlers.CreateExpenseHandler)
	r.POST("/get_all_expenses", handlers.GetAllExpensesHandler)
	r.POST("/get_expense", handlers.GetExpenseHandler)
	r.POST("/edit_expense", handlers.EditExpenseHandler)
	r.POST("/delete_expense", handlers.DeleteExpenseHandler)

	// Invoice Interface
	r.POST("/create_invoice", handlers.CreateInvoiceHandler)
	r.POST("/get_all_invoices", handlers.GetAllInvoicesHandler)
	r.POST("/get_invoice", handlers.GetInvoiceHandler)
	r.POST("/edit_invoice", handlers.EditInvoiceHandler)
	r.POST("/delete_invoice", handlers.DeleteInvoiceHandler)

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
