package models

import "go.mongodb.org/mongo-driver/bson"

type CollectionType interface {
	InsertDocument(m Model, modelType string) (Model, error)
	UpdateDocument(filter bson.M, content bson.M, modelType string) (Model, error)
	FindDocument(filter bson.M, modelType string) (Model, error)
	DeleteDocument(filter bson.M, modelType string) error
}
