package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Profile struct {
	// Fields for actual Profile document in database
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Username    string             `bson:"Username,omitempty"`
	DisplayName string             `bson:"DisplayName,omitempty"`
	Joined      primitive.DateTime `bson:"Joined,omitempty"`
	About       string             `bson:"About,omitempty"`

	// Placeholder fields for profile entry point data
	Modifications []Modification
}

func (p *Profile) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*p = Profile{
		Modifications: p.Modifications,
	}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("profile does not exist")
	}

	// Acquire value and validity of Profile fields from result
	var idOK, usernameOK, displayNameOK, joinedOK, aboutOK bool

	p.ID, idOK = result["_id"].(primitive.ObjectID)
	p.Username, usernameOK = result["Username"].(string)
	p.DisplayName, displayNameOK = result["DisplayName"].(string)
	p.Joined, joinedOK = result["Joined"].(primitive.DateTime)
	p.About, aboutOK = result["About"].(string)

	checklist := []bool{idOK, usernameOK, displayNameOK, joinedOK, aboutOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to profile")
	}

	return nil
}

func (p *Profile) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*p = Profile{
		Modifications: p.Modifications,
	}

	result, err := coll.FindDocument(filter, "Profile")

	if err != nil {
		return errors.New("profile does not exist")
	}

	err = result.SetValue("Modifications", p.Modifications)

	if err != nil {
		return err
	}

	if profileRes, ok := result.(*Profile); ok {
		*p = *profileRes
		return nil
	}

	return errors.New("failed to convert model to Profile")
}

func (p *Profile) GetKeys() []string {
	return []string{
		"_id", "Username", "DisplayName", "Joined", "About",
	}
}

func (p *Profile) GetValue(key string) (any, error) {
	switch key {
	case "_id":
		return p.ID, nil
	case "Username":
		return p.Username, nil
	case "DisplayName":
		return p.DisplayName, nil
	case "Joined":
		return p.Joined, nil
	case "About":
		return p.About, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (p *Profile) SetValue(key string, value any) error {
	switch key {
	case "_id":
		if ID, ok := value.(primitive.ObjectID); ok {
			p.ID = ID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "Username":
		if Username, ok := value.(string); ok {
			p.Username = Username
			return nil
		}

		return errors.New("failed to convert value to string")
	case "DisplayName":
		if DisplayName, ok := value.(string); ok {
			p.DisplayName = DisplayName
			return nil
		}

		return errors.New("failed to convert value to string")
	case "Joined":
		if Joined, ok := value.(primitive.DateTime); ok {
			p.Joined = Joined
			return nil
		}

		return errors.New("failed to convert value to DateTime")
	case "About":
		if About, ok := value.(string); ok {
			p.About = About
			return nil
		}

		return errors.New("failed to convert value to string")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
