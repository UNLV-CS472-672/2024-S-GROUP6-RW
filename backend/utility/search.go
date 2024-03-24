package utility

// Return (true, index) if the target is located in the array,
// otherwise return (false, -1)
func find(arr []interface{}, target interface{}) (bool, int) {
	for i, element := range arr {
		if element == target {
			return true, i
		}
	}

	return false, -1
}

// Helper function which first generates an interface{} slice,
// and then returns the result of find() given the new slice and target.
func Find[T any](arr []T, target T) (bool, int) {
	interfaceSlice := make([]interface{}, len(arr))

	for i, v := range arr {
		interfaceSlice[i] = v
	}

	return find(interfaceSlice, target)
}
