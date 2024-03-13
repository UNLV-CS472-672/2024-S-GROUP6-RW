// 2024-S-GROUP6-RW\backend\main.go

package main

import (
	"backend/handlers"
	"fmt"
	"time"
	"log"
	
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Printf("Current Time: %s\n", time.Now())

	r := gin.Default()
	r.Use(cors.Default()) // Setup CORS middleware as needed

	// User Entry Point
	r.POST("/signin", handlers.SignInHandler)
	r.POST("/register", handlers.RegisterHandler)

	// Set up JWT authentication
	handlers.JWTSetup()

	// Trip Details
	r.POST("/create_trip", handlers.CreateTripHandler)
	// r.GET("/get_all_trips", handlers.GetAllTripsHandler)
	// r.GET("/get_trip", handlers.GetTripHandler)
	// r.POST("/edit_trip", handlers.EditTripHandler)
	// r.POST("/delete_trip", handlers.DeleteTripHandler)

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
