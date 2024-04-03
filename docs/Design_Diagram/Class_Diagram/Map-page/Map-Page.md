# React Component Structure

## User

### State:
- `username`: string
- `email`: string

### Methods:
- `constructor(username: string, email: string)`: void
- `getUsername(): string`
- `getEmail(): string`
- `login(): void`
- `logout(): void`

## InteractiveMap

### State:
- `mapData`: object

### Methods:
- `constructor()`: void
- `viewMap(): void`
- `clickOnMap(): void`
- `addMarker(): void`
- `plotCourse(): void`
- `viewFriendMarkers(): void`
- `placeMarker(): void`
- `viewHotspotHeatmap(): void`

## SystemComponent

### State:
- `componentId`: string
- `componentName`: string

### Methods:
- `constructor(id: string, name: string)`: void
- `getComponentId(): string`
- `getComponentName(): string`
- `performAction(): void`

## TripSearchBar

### State:
- `searchQuery`: string

### Methods:
- `constructor()`: void
- `setSearchQuery(query: string): void`
- `getSearchQuery(): string`
- `displaySearchResults(): void`

## RecommendationsPanel

### State:
- `recommendedItems`: string[]

### Methods:
- `constructor()`: void
- `setRecommendedItems(items: string[]): void`
- `getRecommendedItems(): string[]`
- `displayRecommendations(): void`

## SearchPreferences

### State:
- `filters`: string[]

### Methods:
- `constructor()`: void
- `setFilters(filters: string[]): void`
- `getFilters(): string[]`
- `applyFilters(): void`
