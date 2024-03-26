package utility

// Return true if 'lhs' and 'rhs' contain the same elements in the same order,
// otherwise return false
func equals(lhs []interface{}, rhs []interface{}) bool {
	for i := range len(lhs) {
		if lhs[i] != rhs[i] {
			return false
		}
	}

	return true
}

// Return true if 'lhs' and 'rhs' contain the same elements in any order,
// otherwise return false
func unorderedEquals(lhs []interface{}, rhs []interface{}) bool {
	found_count := 0

	for i := 0; i < len(lhs); i++ {
		found := false

		for j := 0; !found && j < len(rhs); j++ {
			if lhs[i] == rhs[j] {
				found = true
				found_count++
			}
		}

		if !found {
			return false
		}
	}

	return found_count == len(lhs)
}

// Helper function which first generates interface{} slices for 'lhs' and 'rhs',
// and then returns the result of 'equals()' given the new slices.
// Trivially returns false if 'lhs' and 'rhs' are not the same size.
func Equals[T any](lhs []T, rhs []T) bool {
	if len(lhs) != len(rhs) {
		return false
	}

	lhsInterfaceSlice := make([]interface{}, len(lhs))
	rhsInterfaceSlice := make([]interface{}, len(rhs))

	for i := range len(lhs) {
		lhsInterfaceSlice[i] = lhs[i]
		rhsInterfaceSlice[i] = rhs[i]
	}

	return equals(lhsInterfaceSlice, rhsInterfaceSlice)
}

// Helper function which first generates interface{} slices for 'lhs' and 'rhs',
// and then returns the result of 'unorderedEquals()' given the new slices.
// Trivially returns false if 'lhs' and 'rhs' are not the same size.
func UnorderedEquals[T any](lhs []T, rhs []T) bool {
	if len(lhs) != len(rhs) {
		return false
	}

	lhsInterfaceSlice := make([]interface{}, len(lhs))
	rhsInterfaceSlice := make([]interface{}, len(rhs))

	for i := range len(lhs) {
		lhsInterfaceSlice[i] = lhs[i]
		rhsInterfaceSlice[i] = rhs[i]
	}

	return unorderedEquals(lhsInterfaceSlice, rhsInterfaceSlice)
}
