// 2024-S-GROUP6-RW\backend\handlers\auth.go

package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "backend/db"
    "backend/models"
    "golang.org/x/crypto/bcrypt"
    "go.mongodb.org/mongo-driver/bson"
    "context"
)

// SignInHandler handles user login requests
func SignInHandler(c *gin.Context) {
        
	// Declare a variable 'user' of type 'User' to store the parsed JSON request body.
	var user models.User

	// Attempt to bind the incoming JSON payload to the 'user' struct.
	// If there's an error in parsing the JSON to the struct, respond with a 400 Bad Request error.
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return // Stop further execution if there's an error
	}

	// Connect to MongoDB using a helper function that returns a reference to the collection.
	collection := db.ConnectToMongoDB()

	// Attempt to find a user document by email. Use context.TODO() as a placeholder context.
	var result bson.M // Use bson.M to store the result, a flexible way to work with MongoDB documents.
	err := collection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&result)
	if err != nil {
		// If no document is found or any other error occurs, respond with a 401 Unauthorized error.
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return // Stop further execution if there's an error
	}

	// Compare the provided password with the one stored in the database.
	// In a real application, you would hash the provided password and compare it with the stored hash.
	// This is just a placeholder comparison; always use a secure method like bcrypt for password comparison.
	if result["password"] != user.Password {
		// Respond with a 401 Unauthorized error if the passwords do not match.
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return // Stop further execution if there's an error
	}

	// If the password matches, respond with a 200 OK and a success message.
	c.JSON(http.StatusOK, gin.H{"message": "Sign in successful"})
}

// RegisterHandler handles user registration requests
func RegisterHandler(c *gin.Context) {
	var newUser models.User
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := db.ConnectToMongoDB()
	// Check if user already exists
	var existingUser bson.M
	err := collection.FindOne(context.TODO(), bson.M{"email": newUser.Email}).Decode(&existingUser)
	if err == nil { // No error means user was found
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	hashedPassword := string(hashedPasswordBytes)

	// Create the new user
	_, err = collection.InsertOne(context.TODO(), bson.M{
		"username": newUser.Username,
		"email": newUser.Email,
		"password": hashedPassword,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}
