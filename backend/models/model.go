package models

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Model interface {
	GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error
}

func BindData[T Model](c *gin.Context, m T) bool {
	if err := c.BindJSON(&m); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return false
	}
	return true
}
