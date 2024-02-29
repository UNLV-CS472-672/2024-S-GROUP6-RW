package main

import (
    "context"
    "log"
    "net/http"

	"github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// User struct to map incoming JSON payload
type User struct {
    Username string `json:"username"`
    Email    string `json:"email"`
    Password string `json:"password"`
}

// Connect to MongoDB
func connectToMongoDB() *mongo.Collection {
    clientOptions := options.Client().ApplyURI("mongodb+srv://rightway:Ht6LAv40QOo3CiVZ@usermanagement.rmb4fbb.mongodb.net/?retryWrites=true&w=majority&appName=UserManagement")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    collection := client.Database("UserManagement").Collection("Users")
    return collection
}

func main() {
    r := gin.Default()

    // Setup CORS middleware options
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // Specify the allowed origin
        AllowMethods:     []string{"GET", "POST", "OPTIONS"}, // Specify the allowed methods
        AllowHeaders:     []string{"Origin", "Content-Type"}, // Specify the allowed headers
        AllowCredentials: true,
        // Optionally, you can include more settings, such as ExposeHeaders, AllowAllOrigins, etc.
    }))

    r.POST("/signin", func(c *gin.Context) {
        var user User
        if err := c.BindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        collection := connectToMongoDB()

        // Find user by email
        var result bson.M
        err := collection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&result)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
            return
        }

        // Ideally, use bcrypt or a similar library to compare hashed passwords
        if result["password"] != user.Password {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"message": "Sign in successful"})
    })

    // Run the server
    if err := r.Run(":8080"); err != nil {
        log.Fatal(err)
    }
}
