package business

import (
	"backend/db"
	"backend/models"
)

func AddFriend(request models.FriendRequest, database db.Database) error {
	// TODO: Implement add friend business logic

	return nil
}

func GetFriendRequests(user models.User, database db.Database) ([]*models.FriendRequest, error) {
	// TODO: Implement get friend requests business logic

	return nil, nil
}

func GetFriends(user models.User, database db.Database) ([]*models.User, error) {
	// TODO: Implement get friends business logic

	return nil, nil
}

func AcknowledgeFriendRequest(request models.FriendRequest, database db.Database) error {
	// TODO: Implement acknowledge friend request business logic

	return nil
}

func RemoveFriend(request models.FriendRequest, database db.Database) error {
	// TODO: Implement remove friend business logic

	return nil
}
