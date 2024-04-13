// 2024-S-GROUP6-RW\backend\handlers\auth.go

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

func RegisterHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to register a new user.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to new user. Exit handler
	}

	database := db.GetMongoDatabase()

	tokenString, err := business.Register(user, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func SignInHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to sign in a user.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to user. Exit handler
	}

	database := db.GetMongoDatabase()

	tokenString, existingUser, err := business.SignIn(user, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	//Testing
	fmt.Println(existingUser.Username)

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{"token": tokenString, "username": existingUser.Username})
}
