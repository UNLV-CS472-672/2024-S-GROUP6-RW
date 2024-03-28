package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"backend/models"
	"backend/secrets"
)

type Database map[string]models.CollectionType

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

func GetMongoDatabase() Database {
	return Database{
		"UserDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("User", "UserDetails"),
		},
		"ProfileDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("User", "ProfileDetails"),
		},
		"FriendRequestDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("User", "FriendRequestDetails"),
		},
		"TripDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("Trip", "TripDetails"),
		},
		"ActivityDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("Trip", "ActivityDetails"),
		},
		"ExpenseDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("Finance", "ExpenseDetails"),
		},
		"InvoiceDetails": &models.MongoCollection{
			Collection: ConnectToMongoDB("Finance", "InvoiceDetails"),
		},
	}
}

func GetMockDatabase() Database {
	return Database{
		"UserDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
		"ProfileDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
		"FriendRequestDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
		"TripDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
		"ActivityDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
		"ExpenseDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
		"InvoiceDetails": &models.MockCollection{
			Collection: map[primitive.ObjectID]map[string]any{},
		},
	}
}
