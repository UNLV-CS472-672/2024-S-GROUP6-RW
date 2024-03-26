# React Component Structure

## `ExpensesPage`

-  **State:**
   -  `value`: Integer (controls tab selection)
-  **Handlers:**
   -  `handleChange(event, newValue)`: Function (updates tab selection)
-  **Children:**
   -  Renders `ExpensesForm`
   -  Renders `ExpensesSplit` (conditionally rendered based on tab selection)

## `ExpensesForm`

-  **State:**
   -  `expensesData`: Array (holds expense data)
   -  `dialogExpense`: Object | null (current expense to edit or null)
   -  `dialogOpen`: Boolean (dialog visibility)
   -  `searchTerm`: String (search filter term)
   -  `searchType`: String (type of search, e.g., "name" or "payer")
   -  `filteredExpenses`: Array (expenses filtered based on search term)
-  **Handlers:**
   -  `handleRemoveExpense(id)`: Function (removes an expense)
   -  `handleAddExpense(expense)`: Function (adds an expense)
-  **Interactions:**
   -  Uses `NewExpenseDialog` for adding and editing expenses

## `NewExpenseDialog`

-  **Props:**
   -  `newData`: Boolean (indicates if dialog is for new expense)
   -  `expense`: Object (expense to edit)
   -  `onAddExpense`: Function (callback to add an expense)
   -  `onEditExpense`: Function (callback to edit an expense)
-  **State:**
   -  `open`: Boolean (dialog visibility)
   -  `name`, `amount`, `payer`, `date`, `description`: Various (form fields)
   -  `error`: String (error message for validation)
   -  `tabValue`: Integer (controls tab view within dialog)
-  **Handlers:**
   -  `handleClickOpen()`: Function (opens dialog)
   -  `handleClose()`: Function (closes dialog)
   -  `handleAdd()`: Function (handles form submission)

## `ExpensesSplit`

-  **State:**
   -  `people`: Array (list of people involved in expense split)
   -  `open`: Boolean (dialog visibility for adding people)
   -  `detailDialogOpen`: Boolean (visibility for detail editing)
   -  `currentRow`: Object | null (currently selected person or expense detail for editing)
-  **Handlers:**
   -  `handleAddPeople(selectedPeople)`: Function (adds people to split)
   -  `handleDelete(id)`: Function (removes a person from split)
   -  `handleEditPerson(editedPerson)`: Function (updates details for a person)
-  **Interactions:**
   -  Uses `AddPersonDialog` and `DetailDialog` for adding and editing details of people
