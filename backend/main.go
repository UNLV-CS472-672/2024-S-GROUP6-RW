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

	r.POST("/signin", handlers.SignInHandler)
	r.POST("/register", handlers.RegisterHandler)

	handlers.JWTSetup()

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
