// 2024-S-GROUP6-RW\backend\main.go

package main

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "backend/handlers"
    "log"
)

func main() {
    r := gin.Default()
    r.Use(cors.Default()) // Setup CORS middleware as needed

    r.POST("/signin", handlers.SignInHandler)
    r.POST("/register", handlers.RegisterHandler)

    if err := r.Run(":8080"); err != nil {
        log.Fatal(err)
    }
}
