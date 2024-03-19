// 2024-S-GROUP6-RW\backend\db\mongo.go

package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"backend/secrets"
)

var connection_URI, env_err = secrets.GetEnv("MONGO")

func ConnectToMongoDB(db_name, collection_name string) *mongo.Collection {
	if env_err != nil {
		log.Fatal(env_err)
		return nil
	}

	clientOptions := options.Client().ApplyURI(connection_URI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database(db_name).Collection(collection_name)
	return collection
}
