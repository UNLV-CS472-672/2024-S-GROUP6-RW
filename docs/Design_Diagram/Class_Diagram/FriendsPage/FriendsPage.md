# React Component Structure

## User

### Props:
- `Username`: string
- `UserID`: string

### Methods:
- `ViewUserProfile(UserID: string)`: void
- `SearchUser(Username: string)`: void
- `SendFriendRequest()`: void
- `RemoveFriend(UserID: string)`: void

## System

### Methods:
- `SearchForUser(Username: string)`: List<User>

## ViewUserProfile (Use Case)

### Props:
- `UserID`: string

### Methods:
- `ViewUser(UserID: string)`: void

## SearchUser (Use Case)

### Props:
- `Username`: string

### Methods:
- `Search(Username: string)`: void

## SendFriendRequest (Use Case)

### Methods:
- `Send()`: void

## RemoveFriend (Use Case)

### Props:
- `UserID`: string

### Methods:
- `Remove(UserID: string)`: void
