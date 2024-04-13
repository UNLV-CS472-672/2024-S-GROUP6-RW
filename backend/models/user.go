package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	FirstName     string
	LastName      string
	Password      string
	Modifications []Modification
}

func (u *User) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*u = User{
		FirstName: u.FirstName,
		LastName:  u.LastName,
		Password:  u.Password,
	}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

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

func (u *User) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*u = User{
		FirstName: u.FirstName,
		LastName:  u.LastName,
		Password:  u.Password,
	}

	result, err := coll.FindDocument(filter, "User")

	if err != nil {
		return errors.New("user does not exist")
	}

	err = result.SetValue("FirstName", u.FirstName)

	if err != nil {
		return err
	}

	err = result.SetValue("LastName", u.LastName)

	if err != nil {
		return err
	}

	err = result.SetValue("Password", u.Password)

	if err != nil {
		return err
	}

	if userRes, ok := result.(*User); ok {
		*u = *userRes
		return nil
	}

	return errors.New("failed to convert model to User")
}

func (u *User) GetKeys() []string {
	return []string{
		"_id", "Username", "Email", "PassHash", "TripIDs", "FriendIDs", "FriendRequestIDs",
		"InvoiceIDs", "LastLogin",
	}
}

func (u *User) GetValue(key string) (any, error) {
	switch key {
	case "_id":
		return u.ID, nil
	case "Username":
		return u.Username, nil
	case "Email":
		return u.Email, nil
	case "PassHash":
		return u.PassHash, nil
	case "TripIDs":
		return u.TripIDs, nil
	case "FriendIDs":
		return u.FriendIDs, nil
	case "FriendRequestIDs":
		return u.FriendRequestIDs, nil
	case "InvoiceIDs":
		return u.InvoiceIDs, nil
	case "LastLogin":
		return u.LastLogin, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (u *User) SetValue(key string, value any) error {
	switch key {
	case "_id":
		if ID, ok := value.(primitive.ObjectID); ok {
			u.ID = ID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "Username":
		if Username, ok := value.(string); ok {
			u.Username = Username
			return nil
		}

		return errors.New("failed to convert value to string")
	case "Email":
		if Email, ok := value.(string); ok {
			u.Email = Email
			return nil
		}

		return errors.New("failed to convert value to string")
	case "PassHash":
		if PassHash, ok := value.(string); ok {
			u.PassHash = PassHash
			return nil
		}

		return errors.New("failed to convert value to string")
	case "TripIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			u.TripIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "FriendIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			u.FriendIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "FriendRequestIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			u.FriendRequestIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "InvoiceIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			u.InvoiceIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "LastLogin":
		if LastLogin, ok := value.(primitive.DateTime); ok {
			u.LastLogin = LastLogin
			return nil
		}

		return errors.New("failed to convert value to DateTime")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
