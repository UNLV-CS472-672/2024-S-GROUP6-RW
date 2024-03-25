package models

import (
	"context"
	"errors"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	// Fields for actual User document in database
	ID               primitive.ObjectID   `bson:"_id,omitempty"`
	Username         string               `bson:"Username,omitempty"`
	Email            string               `bson:"Email,omitempty"`
	PassHash         string               `bson:"PassHash,omitempty"`
	TripIDs          []primitive.ObjectID `bson:"TripIDs,omitempty"`
	FriendIDs        []primitive.ObjectID `bson:"FriendIDs,omitempty"`
	FriendRequestIDs []primitive.ObjectID `bson:"FriendRequestIDs,omitempty"`
	InvoiceIDs       []primitive.ObjectID `bson:"InvoiceIDs,omitempty"`
	LastLogin        primitive.DateTime   `bson:"LastLogin,omitempty"`

	// Placeholder fields for user entry point data
	FirstName string
	LastName  string
	Password  string
}

func (u *User) GetDocument(c *gin.Context, coll *mongo.Collection, filter bson.M) error {
	*u = User{
		FirstName: u.FirstName,
		LastName:  u.LastName,
		Password:  u.Password,
	}

	var result bson.M
	err := coll.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("user does not exist")
	}

	// Acquire value and validity of User fields from result
	var idOK, userOK, emailOK, passOK, tripsOK, friendsOK, friendRequestsOK, invoicesOK, lastLoginOK bool
	var tripList, friendList, friendRequestList, invoiceList primitive.A
	var id primitive.ObjectID

	u.ID, idOK = result["_id"].(primitive.ObjectID)
	u.Username, userOK = result["Username"].(string)
	u.Email, emailOK = result["Email"].(string)
	u.PassHash, passOK = result["PassHash"].(string)

	tripList, tripsOK = result["TripIDs"].(primitive.A)
	friendList, friendsOK = result["FriendIDs"].(primitive.A)
	friendRequestList, friendRequestsOK = result["FriendRequestIDs"].(primitive.A)
	invoiceList, invoicesOK = result["InvoiceIDs"].(primitive.A)

	if result["LastLogin"] == nil {
		u.LastLogin = 0
		lastLoginOK = true
	} else {
		u.LastLogin, lastLoginOK = result["LastLogin"].(primitive.DateTime)
	}

	type converter struct {
		flag   *bool
		source *primitive.A
		dest   *[]primitive.ObjectID
	}

	idConverter := []converter{
		{&tripsOK, &tripList, &u.TripIDs},
		{&friendsOK, &friendList, &u.FriendIDs},
		{&friendRequestsOK, &friendRequestList, &u.FriendRequestIDs},
		{&invoicesOK, &invoiceList, &u.InvoiceIDs},
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

	checklist := []bool{idOK, userOK, emailOK, passOK, tripsOK, friendsOK, friendRequestsOK, invoicesOK, lastLoginOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to user")
	}

	return nil
}
