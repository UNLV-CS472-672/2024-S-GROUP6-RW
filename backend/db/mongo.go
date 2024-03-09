// 2024-S-GROUP6-RW\backend\db\mongo.go

package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connection_URI string = "mongodb+srv://rightway:Ht6LAv40QOo3CiVZ@usermanagement.rmb4fbb.mongodb.net/?retryWrites=true&w=majority&appName=UserManagement"

func ConnectToMongoDB(db_name, collection_name string) *mongo.Collection {
	clientOptions := options.Client().ApplyURI(connection_URI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database(db_name).Collection(collection_name)
	return collection
}
