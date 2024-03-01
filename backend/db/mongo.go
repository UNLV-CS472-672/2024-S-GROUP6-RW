// 2024-S-GROUP6-RW\backend\db\mongo.go

package db

import (
    "context"
    "log"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectToMongoDB() *mongo.Collection {
    clientOptions := options.Client().ApplyURI("mongodb+srv://rightway:Ht6LAv40QOo3CiVZ@usermanagement.rmb4fbb.mongodb.net/?retryWrites=true&w=majority&appName=UserManagement")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    collection := client.Database("UserManagement").Collection("Users")
    return collection
}
