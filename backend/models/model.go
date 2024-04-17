package models

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Modification struct {
	// Fields to bind from modification request
	FieldName string      `json:"FieldName"`
	Data      interface{} `json:"Data"`
}

type Model interface {
	GetMongoDocument(coll *MongoCollection, filter bson.M) error
	GetMockDocument(coll *MockCollection, filter bson.M) error
	GetKeys() []string
	GetValue(key string) (any, error)
	SetValue(key string, value any) error
}

type ModelFactory func() Model

var ModelFactories = map[string]ModelFactory{
	"User": func() Model {
		return &User{
			ID:               primitive.ObjectID{},
			Username:         "",
			Email:            "",
			PassHash:         "",
			TripIDs:          make([]primitive.ObjectID, 0),
			FriendIDs:        make([]primitive.ObjectID, 0),
			FriendRequestIDs: make([]primitive.ObjectID, 0),
			InvoiceIDs:       make([]primitive.ObjectID, 0),
			LastLogin:        primitive.DateTime(0),
		}
	},
	"FriendRequest": func() Model {
		return &FriendRequest{
			ID:       primitive.ObjectID{},
			SenderID: primitive.ObjectID{},
			TargetID: primitive.ObjectID{},
		}
	},
	"Trip": func() Model {
		return &Trip{
			ID:           primitive.ObjectID{},
			TripOwnerID:  primitive.ObjectID{},
			Title:        "",
			LocationName: "",
			StartDate:    primitive.DateTime(0),
			EndDate:      primitive.DateTime(0),
			MemberIDs:    make([]primitive.ObjectID, 0),
			ActivityIDs:  make([]primitive.ObjectID, 0),
			ExpenseIDs:   make([]primitive.ObjectID, 0),
		}
	},
	"Profile": func() Model {
		return &Profile{
			ID:          primitive.ObjectID{},
			Username:    "",
			DisplayName: "",
			Joined:      primitive.DateTime(0),
			About:       "",
		}
	},
	"Activity": func() Model {
		return &Activity{
			ID:           primitive.ObjectID{},
			ParentTripID: primitive.ObjectID{},
			Description:  "",
			StartDate:    primitive.DateTime(0),
			EndDate:      primitive.DateTime(0),
			ImageURI:     "",
			IsMapBased:   false,
			Address:      "",
			Coordinate:   "",
		}
	},
	"Expense": func() Model {
		return &Expense{
			ID:               primitive.ObjectID{},
			ParentTripID:     primitive.ObjectID{},
			Title:            "",
			Amount:           float64(0.0),
			InvoiceIDs:       make([]primitive.ObjectID, 0),
			RemainingBalance: float64(0.0),
			IsPaid:           false,
		}
	},
	"Invoice": func() Model {
		return &Invoice{
			ID:              primitive.ObjectID{},
			ParentExpenseID: primitive.ObjectID{},
			PayeeID:         primitive.ObjectID{},
			Description:     "",
			Balance:         float64(0.0),
		}
	},
}

func BindData(c *gin.Context, m Model) bool {
	if err := c.BindJSON(&m); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return false
	}
	return true
}
