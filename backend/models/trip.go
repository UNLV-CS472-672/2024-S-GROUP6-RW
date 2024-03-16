package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TripModification struct {
	// Fields to bind from trip modification request
	FieldName string      `json:"FieldName"`
	Data      interface{} `json:"Data"`
}

type Trip struct {
	// Fields for actual Trip document in database
	ID           primitive.ObjectID   `bson:"_id,omitempty"`
	TripOwnerID  primitive.ObjectID   `bson:"TripOwnerID,omitempty"`
	TripTitle    string               `bson:"TripTitle,omitempty"`
	LocationName string               `bson:"LocationName,omitempty"`
	MemberIDs    []primitive.ObjectID `bson:"MemberIDs,omitempty"`
	ActivityIDs  []primitive.ObjectID `bson:"ActivityIDs,omitempty"`
	ExpenseIDs   []primitive.ObjectID `bson:"ExpenseIDs,omitempty"`

	// Placeholder fields for HTTP request body information not stored to Trip database
	Username      string
	Modifications []TripModification
}

func (t *Trip) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*t = Trip{}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("Trip does not exist.")
	}

	// Acquire value and validity of Trip fields from result
	var idOK, ownerOK, tripTitleOK, locationNameOK, membersOK, activitiesOK, expensesOK bool
	var activityList, memberList, expenseList primitive.A
	var id primitive.ObjectID

	t.ID, idOK = result["_id"].(primitive.ObjectID)
	t.TripOwnerID, ownerOK = result["TripOwnerID"].(primitive.ObjectID)
	t.TripTitle, tripTitleOK = result["TripTitle"].(string)
	t.LocationName, locationNameOK = result["LocationName"].(string)
	memberList, membersOK = result["MemberIDs"].(primitive.A)
	activityList, activitiesOK = result["ActivityIDs"].(primitive.A)
	expenseList, expensesOK = result["ExpenseIDs"].(primitive.A)

	type converter struct {
		flag   *bool
		source *primitive.A
		dest   *[]primitive.ObjectID
	}

	idConverter := []converter{
		converter{&membersOK, &memberList, &t.MemberIDs},
		converter{&activitiesOK, &activityList, &t.ActivityIDs},
		converter{&expensesOK, &expenseList, &t.ExpenseIDs},
	}

	for i := range idConverter {
		// Get a pointer to the original converter instance
		cvt := &idConverter[i]

		for i := 0; *cvt.flag && i < len(*cvt.source); i++ {
			id, *cvt.flag = (*cvt.source)[i].(primitive.ObjectID)

			if *cvt.flag {
				*cvt.dest = append(*cvt.dest, id)
			}
		}
	}

	checklist := []bool{idOK, ownerOK, tripTitleOK, locationNameOK, membersOK, activitiesOK, expensesOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("Failed to convert result to Trip.")
	}

	return nil
}
