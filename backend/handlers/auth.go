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
	"github.com/dgrijalva/jwt-go"
    "time"
	"fmt"
)


var jwtSecretKey = []byte("one_way_is_the_right_way")

// GenerateJWT creates a JWT token for a given username and sends a response with it.
func GenerateJWT(username string, c *gin.Context) {
	expirationTime := time.Now().Add(1 * time.Hour) // Token valid for 1 hour

	// Create the JWT claims, which includes the username and expiry time
	claims := &jwt.StandardClaims{
		Subject:   username,
		ExpiresAt: expirationTime.Unix(),
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Create the JWT string
	tokenString, err := token.SignedString(jwtSecretKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create token"})
		return
	}

	// Send the response with the JWT to the client
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// SignInHandler handles user login requests
func SignInHandler(c *gin.Context) {

	fmt.Println("Attempting to sign in a user")
        
	// Declare a variable 'user' of type 'User' to store the parsed JSON request body.
	var user models.User

	// Attempt to bind the incoming JSON payload to the 'user' struct.
	// If there's an error in parsing the JSON to the struct, respond with a 400 Bad Request error.
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return // Stop further execution if there's an error
	}

	// After finding the user in the database
	fmt.Printf("Found user: %s\n", user.Email)

	// Connect to MongoDB using a helper function that returns a reference to the collection.
	collection := db.ConnectToMongoDB()

	// Attempt to find a user document by email. Use context.TODO() as a placeholder context.
	var result bson.M // Use bson.M to store the result, a flexible way to work with MongoDB documents.
	err := collection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&result)
	if err != nil {
		// If no document is found or any other error occurs, respond with a 401 Unauthorized error.
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return // Stop further execution if there's an error
	}else{
		fmt.Print("Email Found")
	}

	// Compare the provided password with the one stored in the database.
	// We use bcrypt.CompareHashAndPassword to safely compare the hashed password with the provided password.
	if err := bcrypt.CompareHashAndPassword([]byte(result["password"].(string)), []byte(user.Password)); err != nil {
		// If CompareHashAndPassword returns an error, the passwords do not match.
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return // Stop further execution if there's an error
	} else {
		fmt.Println("Password matches")
	}

	// Right before generating JWT
	fmt.Println("Generating JWT for user")
	GenerateJWT(result["username"].(string), c)

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

	GenerateJWT(newUser.Username, c)
}
