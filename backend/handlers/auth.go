// 2024-S-GROUP6-RW\backend\handlers\auth.go

package handlers

import (
	"backend/db"
	"backend/models"
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"

	"backend/secrets"
)

var jwtSecretKey []byte
var jwt_err error

func JWTSetup() {
	var tmp string
	tmp, jwt_err = secrets.GetEnv("JWT")
	jwtSecretKey = []byte(tmp)
}

// GenerateJWT creates a JWT token for a given username
func GenerateJWT(username string) (string, error) {
	// Check that the JWT key exists
	if jwt_err != nil {
		log.Fatal(jwt_err)
		return "", jwt_err
	}

	// Token valid for 1 hour
	expirationTime := time.Now().Add(1 * time.Hour)

	// Create the JWT claims, which includes the username and expiry time
	claims := &jwt.StandardClaims{
		Subject:   username,
		ExpiresAt: expirationTime.Unix(),
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Create the JWT string
	return token.SignedString(jwtSecretKey)
}

// SignInHandler handles user login requests
func SignInHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to sign in a user.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to user. Exit handler
	}

	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Find existing user in database
	if err := user.GetDocument(c, UserDetails, bson.M{"Email": user.Email}); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return // Failed to get user document. Exit handler
	}

	// Validate password by bcrypt hash comparison
	res := bcrypt.CompareHashAndPassword([]byte(user.PassHash), []byte(user.Password))

	if res != nil {
		fmt.Println("Password incorrect.")
		// If stored hash value does not match query value, then password is not correct
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password."})
		return // Stop further execution if there's an error
	}

	fmt.Println("Password correct.")

	// Update last login time for user
	filter := bson.M{"_id": user.ID}

	update := bson.M{"$set": bson.M{
		"LastLogin": primitive.NewDateTimeFromTime(time.Now()),
	}}

	_, err := UserDetails.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to update user. Exit handler
	}

	fmt.Println("Generating JWT for user")

	// Get JWT token for sign in session
	tokenString, err := GenerateJWT(user.Username)

	if err != nil {
		fmt.Printf("%T SecretKey = %s\n", jwtSecretKey, jwtSecretKey)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to generate user token. Exit handler
	}

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// RegisterHandler handles user registration requests
func RegisterHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to register a new user.\n", time.Now())

	var user models.User

	if !models.BindData(c, &user) {
		return // Failed to bind data to new user. Exit handler
	}

	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Check if user already exists
	var existingUser models.User

	if err := existingUser.GetDocument(c, UserDetails, bson.M{"Username": user.Username}); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User already exists."})
		return // Requested user already exists. Exit handler
	}

	// Generate password hash for user
	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ProfileDetails := db.ConnectToMongoDB("User", "ProfileDetails")

	fmt.Println("Creating User.")

	// Create new user entry in database
	_, err = UserDetails.InsertOne(context.TODO(), bson.M{
		"TripIDs":          make([]primitive.ObjectID, 0),
		"FriendIDs":        make([]primitive.ObjectID, 0),
		"FriendRequestIDs": make([]primitive.ObjectID, 0),
		"Username":         user.Username,
		"PassHash":         string(hashedPasswordBytes),
		"Email":            user.Email,
		"InvoiceIDs":       make([]primitive.ObjectID, 0),
		"LastLogin":        nil,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to create user. Exit handler
	}

	fmt.Println("Creating Profile.")

	// Create new profile entry in database
	_, err = ProfileDetails.InsertOne(context.TODO(), bson.M{
		"Username":    user.Username,
		"DisplayName": user.FirstName + " " + user.LastName,
		"Joined":      primitive.NewDateTimeFromTime(time.Now()),
		"About":       "",
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to create profile. Exit handler
	}

	fmt.Println("Generating JWT for user")

	// Get JWT token
	tokenString, err := GenerateJWT(user.Username)

	if err != nil {
		fmt.Printf("%T SecretKey = %s\n", jwtSecretKey, jwtSecretKey)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Failed to generate user token. Exit handler
	}

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
