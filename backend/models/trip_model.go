// 2024-S-GROUP6-RW\backend\models\trip.go

package models

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Trip struct {
	// Fields for actual Trip document in database
	ID           primitive.ObjectID   `bson:"_id,omitempty"`
	TripOwnerID  primitive.ObjectID   `bson:"TripOwnerID,omitempty"`
	Title        string               `bson:"Title,omitempty"`
	LocationName string               `bson:"LocationName,omitempty"`
	StartDate    primitive.DateTime   `bson:"StartDate,omitempty"`
	EndDate      primitive.DateTime   `bson:"EndDate,omitempty"`
	MemberIDs    []primitive.ObjectID `bson:"MemberIDs,omitempty"`
	ActivityIDs  []primitive.ObjectID `bson:"ActivityIDs,omitempty"`
	ExpenseIDs   []primitive.ObjectID `bson:"ExpenseIDs,omitempty"`

	// Placeholder fields for trip entry point data
	TripOwner     string
	Modifications []Modification
}

func (t *Trip) GetMongoDocument(coll *MongoCollection, filter bson.M) error {
	*t = Trip{
		TripOwner:     t.TripOwner,
		Modifications: t.Modifications,
	}

	var result bson.M
	err := coll.Collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return errors.New("trip does not exist")
	}

	// Acquire value and validity of Trip fields from result
	var idOK, ownerOK, titleOK, locationNameOK, startDateOK, endDateOK, membersOK, activitiesOK, expensesOK bool
	var activityList, memberList, expenseList primitive.A
	var id primitive.ObjectID

	t.ID, idOK = result["_id"].(primitive.ObjectID)
	t.TripOwnerID, ownerOK = result["TripOwnerID"].(primitive.ObjectID)
	t.Title, titleOK = result["Title"].(string)
	t.LocationName, locationNameOK = result["LocationName"].(string)
	t.StartDate, startDateOK = result["StartDate"].(primitive.DateTime)
	t.EndDate, endDateOK = result["EndDate"].(primitive.DateTime)
	memberList, membersOK = result["MemberIDs"].(primitive.A)
	activityList, activitiesOK = result["ActivityIDs"].(primitive.A)
	expenseList, expensesOK = result["ExpenseIDs"].(primitive.A)

	type converter struct {
		flag   *bool
		source *primitive.A
		dest   *[]primitive.ObjectID
	}

	idConverter := []converter{
		{&membersOK, &memberList, &t.MemberIDs},
		{&activitiesOK, &activityList, &t.ActivityIDs},
		{&expensesOK, &expenseList, &t.ExpenseIDs},
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

	checklist := []bool{idOK, ownerOK, titleOK, locationNameOK, startDateOK, endDateOK, membersOK, activitiesOK, expensesOK}

	// Check if all results are valid
	valid := true

	for i := 0; valid && i < len(checklist); i++ {
		valid = valid && checklist[i]
	}

	if !valid {
		return errors.New("failed to convert result to trip")
	}

	return nil
}

// TODO: Verify integrity of mock document retrieval
func (t *Trip) GetMockDocument(coll *MockCollection, filter bson.M) error {
	*t = Trip{
		TripOwner:     t.TripOwner,
		Modifications: t.Modifications,
	}

	result, err := coll.FindDocument(filter, "Trip")

	if err != nil {
		return errors.New("trip does not exist")
	}

	err = result.SetValue("Username", t.TripOwner)

	if err != nil {
		return err
	}

	err = result.SetValue("Modifications", t.Modifications)

	if err != nil {
		return err
	}

	if tripRes, ok := result.(*Trip); ok {
		*t = *tripRes
		return nil
	}

	return errors.New("failed to convert model to Trip")
}

func (t *Trip) GetKeys() []string {
	return []string{
		"_id", "TripOwnerID", "Title", "LocationName", "StartDate", "EndDate",
		"MemberIDs", "ActivityIDs", "ExpenseIDs",
	}
}

func (t *Trip) GetValue(key string) (any, error) {
	switch key {
	case "_id":
		return t.ID, nil
	case "TripOwnerID":
		return t.TripOwnerID, nil
	case "Title":
		return t.Title, nil
	case "LocationName":
		return t.LocationName, nil
	case "StartDate":
		return t.StartDate, nil
	case "EndDate":
		return t.EndDate, nil
	case "MemberIDs":
		return t.MemberIDs, nil
	case "ActivityIDs":
		return t.ActivityIDs, nil
	case "ExpenseIDs":
		return t.ExpenseIDs, nil
	default:
		return nil, errors.New("Unknown key: '" + key + "'.")
	}
}

func (t *Trip) SetValue(key string, value any) error {
	switch key {
	case "_id":
		if ID, ok := value.(primitive.ObjectID); ok {
			t.ID = ID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "TripOwnerID":
		if TripOwnerID, ok := value.(primitive.ObjectID); ok {
			t.TripOwnerID = TripOwnerID
			return nil
		}

		return errors.New("failed to convert value to ObjectID")
	case "Title":
		if Title, ok := value.(string); ok {
			t.Title = Title
			return nil
		}

		return errors.New("failed to convert value to string")
	case "LocationName":
		if LocationName, ok := value.(string); ok {
			t.LocationName = LocationName
			return nil
		}

		return errors.New("failed to convert value to string")
	case "StartDate":
		if StartDate, ok := value.(primitive.DateTime); ok {
			t.StartDate = StartDate
			return nil
		}

		return errors.New("failed to convert value to DateTime")
	case "EndDate":
		if EndDate, ok := value.(primitive.DateTime); ok {
			t.EndDate = EndDate
			return nil
		}

		return errors.New("failed to convert value to DateTime")
	case "MemberIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			t.MemberIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "ActivityIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			t.ActivityIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	case "ExpenseIDs":
		if idList, ok := value.([]primitive.ObjectID); ok {
			t.ExpenseIDs = idList
			return nil
		}

		return errors.New("failed to convert value to []ObjectID")
	default:
		return errors.New("Unknown key: '" + key + "'.")
	}
}
