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
	"go.mongodb.org/mongo-driver/mongo"
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


// GenerateJWT creates a JWT token for a given username and sends a response with it.
func GenerateJWT(username string, c *gin.Context) {
	if jwt_err != nil {
		log.Fatal(jwt_err)
		return
	}

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
		fmt.Printf("%T SecretKey = %s\n", jwtSecretKey, jwtSecretKey)
		// If there is an error in creating the JWT return an internal server error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create token"})
		return
	}

	// Send the response with the JWT to the client
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// SignInHandler handles user login requests
func SignInHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to sign in a user.\n", time.Now())

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
	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Attempt to find a user document by email. Use context.TODO() as a placeholder context.
	var result bson.M // Use bson.M to store the result, a flexible way to work with MongoDB documents.
	err := UserDetails.FindOne(context.TODO(), bson.M{"Email": user.Email}).Decode(&result)

	fmt.Println(result)

	if err != nil {
		// If no document is found or any other error occurs, respond with a 401 Unauthorized error.
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return // Stop further execution if there's an error
	} else {
		fmt.Println("Email Found")
	}

	// Compare the provided password with the one stored in the database.
	// We use bcrypt.CompareHashAndPassword to safely compare the hashed password with the provided password.
	stored, ok := result["PassHash"].(string)
	res := bcrypt.CompareHashAndPassword([]byte(stored), []byte(user.Password))

	if ok && res != nil {
		fmt.Println("Password incorrect.")
		// If stored hash value does not match query value, then password is not correct
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return // Stop further execution if there's an error
	} else if !ok {
		fmt.Println("Password corrupted.")
		// If stored hash value could not be converted to a string, then data is corrupt
		c.JSON(http.StatusExpectationFailed, gin.H{"error": "Corrupted credential data"})
		return // Stop further execution if there's an error
	} else {
		fmt.Println("Password matches")

		filter := bson.M{"_id": result["_id"]}

		update := bson.M{"$set": bson.M{"LastLogin": primitive.NewDateTimeFromTime(time.Now())}}

		UserDetails.UpdateOne(context.TODO(), filter, update)
	}

	// Right before generating JWT
	fmt.Println("Generating JWT for user")
	GenerateJWT(result["Username"].(string), c)
}

// RegisterHandler handles user registration requests
func RegisterHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to register a new user.\n", time.Now())

	var newUser models.User
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	UserDetails := db.ConnectToMongoDB("User", "UserDetails")

	// Check if user already exists
	var existingUser bson.M
	err := UserDetails.FindOne(context.TODO(), bson.M{"Email": newUser.Email}).Decode(&existingUser)
	if err == nil { // No error means user was found
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Initialize user data into struct fields
	newUser.PassHash = string(hashedPasswordBytes)
	newUser.TripIDs = make([]primitive.ObjectID, 0)
	newUser.FriendIDs = make([]primitive.ObjectID, 0)
	newUser.InvoiceIDs = make([]primitive.ObjectID, 0)

	ProfileDetails := db.ConnectToMongoDB("User", "ProfileDetails")
	
	fmt.Println("Creating Profile.")

	// Create new profile
	newProfile := models.Profile{}

	newProfile.DisplayName = newUser.FirstName + " " + newUser.LastName
	newProfile.Joined = primitive.NewDateTimeFromTime(time.Now())

	var ProfileID *mongo.InsertOneResult

	ProfileID, err = ProfileDetails.InsertOne(context.TODO(), bson.M{
		"DisplayName": newProfile.DisplayName,
		"Joined":      newProfile.Joined,
	})

	if err != nil {
		fmt.Println("Error: " + err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create profile"})
		return
	}

	fmt.Println("Creating User.")

	// Create the new user
	_, err = UserDetails.InsertOne(context.TODO(), bson.M{
		"ProfileID":  ProfileID.InsertedID,
		"TripIDs":    newUser.TripIDs,
		"FriendIDs":  newUser.FriendIDs,
		"Username":   newUser.Username,
		"PassHash":   newUser.PassHash,
		"Email":      newUser.Email,
		"InvoiceIDs": newUser.InvoiceIDs,
		"LastLogin":  nil,
	})

	if err != nil {
		fmt.Println("Error: " + err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	fmt.Println("Generating JWT for user")
	GenerateJWT(newUser.Username, c)
}