package business

import (
	"backend/db"
	"backend/models"
	"backend/utility"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
)

func AddFriend(request models.FriendRequest, database db.Database) (*models.FriendRequest, error) {
	// Acquire reference to sender
	user := models.User{
		Username: request.SenderUsername,
	}

	existingSender, err := GetUser(user, database)

	if err != nil {
		return nil, err
	}

	// Acquire reference to target
	user.Username = request.TargetUsername

	existingTarget, err := GetUser(user, database)

	if err != nil {
		return nil, err
	}

	// Check that a request does not already exist between the users
	_, err = database["FriendRequestDetails"].FindDocument(bson.M{"SenderID": existingSender.ID, "TargetID": existingTarget.ID}, "FriendRequest")

	if err == nil {
		return nil, errors.New("friend request already exists")
	}

	// Check that users are not already friends
	targetFound, _ := utility.Find(existingSender.FriendIDs[:], existingTarget.ID)
	senderFound, _ := utility.Find(existingTarget.FriendIDs[:], existingSender.ID)

	if targetFound || senderFound {
		return nil, errors.New("users are already friends")
	}

	// Create friend request between users
	newRequest := &models.FriendRequest{
		SenderID: existingSender.ID,
		TargetID: existingTarget.ID,
	}

	document, err := database["FriendRequestDetails"].InsertDocument(newRequest, "FriendRequest")

	if err != nil {
		return nil, err
	}

	insertedRequest, ok := document.(*models.FriendRequest)

	if !ok {
		return nil, errors.New("failed to convert model to FriendRequest")
	}

	// Add reference to friend request to both users
	existingSender.FriendRequestIDs = append(existingSender.FriendRequestIDs, insertedRequest.ID)
	existingTarget.FriendRequestIDs = append(existingTarget.FriendRequestIDs, insertedRequest.ID)

	// Update sender
	update := bson.M{
		"FriendRequestIDs": existingSender.FriendRequestIDs,
	}

	_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingSender.ID}, update, "User")

	if err != nil {
		return nil, err
	}

	// Update target
	update = bson.M{
		"FriendRequestIDs": existingTarget.FriendRequestIDs,
	}

	_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingTarget.ID}, update, "User")

	if err != nil {
		return nil, err
	}

	return insertedRequest, nil
}

func GetFriendRequests(user models.User, database db.Database) ([]*models.FriendRequest, error) {
	// Acquire reference to user
	existingUser, err := GetUser(user, database)

	if err != nil {
		return nil, err
	}

	// Collect pending requests from user
	requestList := []*models.FriendRequest{}

	for _, requestID := range existingUser.FriendRequestIDs {
		// Acquire reference to request
		document, err := database["FriendRequestDetails"].FindDocument(bson.M{"_id": requestID}, "FriendRequest")

		if err != nil {
			return nil, err
		}

		existingRequest, ok := document.(*models.FriendRequest)

		if !ok {
			return nil, errors.New("failed to convert model to FriendRequest")
		}

		requestList = append(requestList, existingRequest)
	}

	return requestList, nil
}

func GetFriends(user models.User, database db.Database) ([]*models.User, error) {
	// Acquire reference to user
	existingUser, err := GetUser(user, database)

	if err != nil {
		return nil, err
	}

	// Collect friends from user
	friendList := []*models.User{}

	for _, friendID := range existingUser.FriendIDs {
		// Acquire reference to friend
		document, err := database["UserDetails"].FindDocument(bson.M{"_id": friendID}, "User")

		if err != nil {
			return nil, err
		}

		existingFriend, ok := document.(*models.User)

		if !ok {
			return nil, errors.New("failed to convert model to User")
		}

		friendList = append(friendList, existingFriend)
	}

	return friendList, nil
}

func AcknowledgeFriendRequest(request models.FriendRequest, database db.Database) error {
	// Acquire reference to sender
	user := &models.User{
		Username: request.SenderUsername,
	}

	existingSender, err := GetUser(*user, database)

	if err != nil {
		return err
	}

	// Acquire reference to target
	user.Username = request.TargetUsername

	existingTarget, err := GetUser(*user, database)

	if err != nil {
		return err
	}

	// Acquire reference to request
	document, err := database["FriendRequestDetails"].FindDocument(bson.M{"SenderID": existingSender.ID, "TargetID": existingTarget.ID}, "FriendRequest")

	if err != nil {
		return err
	}

	existingRequest, ok := document.(*models.FriendRequest)

	if !ok {
		return errors.New("failed to convert model to FriendRequest")
	}

	// Only modify friends lists if the request is accepted
	if request.AcceptRequest {
		// Add users to each others' friends list
		existingSender.FriendIDs = append(existingSender.FriendIDs, existingTarget.ID)
		existingTarget.FriendIDs = append(existingTarget.FriendIDs, existingSender.ID)

		// Update sender
		update := bson.M{
			"FriendIDs": existingSender.FriendIDs,
		}

		_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingSender.ID}, update, "User")

		if err != nil {
			return err
		}

		// Update target
		update = bson.M{
			"FriendIDs": existingTarget.FriendIDs,
		}

		_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingTarget.ID}, update, "User")

		if err != nil {
			return err
		}
	}

	// Locate request in both users friend requests
	senderRequestFound, senderRequestIndex := utility.Find(existingSender.FriendRequestIDs[:], existingRequest.ID)
	targetRequestFound, targetRequestIndex := utility.Find(existingTarget.FriendRequestIDs[:], existingRequest.ID)

	if !senderRequestFound {
		return errors.New("failed to locate request in sender's friend requests")
	}

	if !targetRequestFound {
		return errors.New("failed to locate request in target's friend requests")
	}

	// Remove reference to request from both users
	existingSender.FriendRequestIDs = append(existingSender.FriendRequestIDs[:senderRequestIndex], existingSender.FriendRequestIDs[senderRequestIndex+1:]...)
	existingTarget.FriendRequestIDs = append(existingTarget.FriendRequestIDs[:targetRequestIndex], existingTarget.FriendRequestIDs[targetRequestIndex+1:]...)

	// Update sender
	update := bson.M{
		"FriendRequestIDs": existingSender.FriendRequestIDs,
	}

	_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingSender.ID}, update, "User")

	if err != nil {
		return err
	}

	// Update target
	update = bson.M{
		"FriendRequestIDs": existingTarget.FriendRequestIDs,
	}

	_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingTarget.ID}, update, "User")

	if err != nil {
		return err
	}

	return nil
}

func RemoveFriend(request models.FriendRequest, database db.Database) error {
	// Acquire reference to sender
	user := &models.User{
		Username: request.SenderUsername,
	}

	existingSender, err := GetUser(*user, database)

	if err != nil {
		return err
	}

	// Acquire reference to target
	user.Username = request.TargetUsername

	existingTarget, err := GetUser(*user, database)

	if err != nil {
		return err
	}

	// Verify that users are friends with each other
	foundTarget, targetIndex := utility.Find(existingSender.FriendIDs[:], existingTarget.ID)

	if !foundTarget {
		return errors.New("failed to locate target user in sender's friends list")
	}

	foundSender, senderIndex := utility.Find(existingTarget.FriendIDs[:], existingSender.ID)

	if !foundSender {
		return errors.New("failed to locate sender user in target's friends list")
	}

	// Remove users from each others' friends list
	existingSender.FriendIDs = append(existingSender.FriendIDs[:targetIndex], existingSender.FriendIDs[targetIndex+1:]...)
	existingTarget.FriendIDs = append(existingTarget.FriendIDs[:senderIndex], existingTarget.FriendIDs[senderIndex+1:]...)

	// Update sender
	update := bson.M{
		"FriendIDs": existingSender.FriendIDs,
	}

	_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingSender.ID}, update, "User")

	if err != nil {
		return err
	}

	// Update target
	update = bson.M{
		"FriendIDs": existingTarget.FriendIDs,
	}

	_, err = database["UserDetails"].UpdateDocument(bson.M{"_id": existingTarget.ID}, update, "User")

	if err != nil {
		return err
	}

	return nil
}
