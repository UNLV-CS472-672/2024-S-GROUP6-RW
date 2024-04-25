package business

import (
	"backend/db"
	"backend/models"
	"backend/secrets"
	"errors"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecretKey []byte
var jwt_err error

func JWTSetup() error {
	var tmp string
	tmp, jwt_err = secrets.GetEnv("JWT")
	jwtSecretKey = []byte(tmp)

	return jwt_err
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

func Register(user models.User, database db.Database) (string, error) {
	// Create user account
	_, err := CreateUser(user, database)

	if err != nil {
		return "", err
	}

	// Create user profile
	_, err = CreateProfile(user, database)

	if err != nil {
		return "", err
	}

	// Generate JWT for user
	tokenString, err := GenerateJWT(user.Username)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func SignIn(user models.User, database db.Database) (string, *models.User, error) {
	// Acquire existing user
	document, err := database["UserDetails"].FindDocument(bson.M{"Email": user.Email}, "User")

	if err != nil {
		return "", nil, err
	}

	existingUser, ok := document.(*models.User)

	if !ok {
		return "", nil, errors.New("failed to convert model to User")
	}

	// Verify login details
	res := bcrypt.CompareHashAndPassword([]byte(existingUser.PassHash), []byte(user.Password))

	if res != nil {
		return "", nil, errors.New("invalid email or password")
	}

	// Update last login time for user
	filter := bson.M{"Email": user.Email}

	update := bson.M{
		"LastLogin": primitive.NewDateTimeFromTime(time.Now()),
	}

	updateResult, err := database["UserDetails"].UpdateDocument(filter, update, "User")

	if err != nil {
		return "", nil, err
	}

	updateUser, ok := updateResult.(*models.User)

	if !ok {
		return "", nil, errors.New("failed to convert model to User")
	}

	// Generate JWT for user
	tokenString, err := GenerateJWT(user.Username)

	if err != nil {
		return "", nil, err
	}

	return tokenString, updateUser, nil
}
