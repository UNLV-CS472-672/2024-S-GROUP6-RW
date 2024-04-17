# AI Usage in Expense Page and Components

## Planning and Strategy

### Objective

- Use AI to assist in debugging, writing complex code and skeleton code, and generating mock data for the Expense Page and its components.

### Scope

- The AI will be used to identify and fix bugs in the code.
- The AI will also be used to implement new features where the implementation is not straightforward.
- The AI will generate mock data for testing and demonstration purposes.
- The AI will generate skeleton code for styles and components.

### Strategy

#### Bug Fix

- Use AI-powered tool to identify bugs in the code.
- Use AI to suggest fixes for identified bugs.

#### Complex Feature

- Use AI to generate code for complex features.

#### Mock Data

- Use AI to generate mock data and auto-generate data for testing and demonstration purposes.

#### Skeleton Code

- Use AI to generate skeleton code for styles and components.

## Results

- The AI has been helpful in debugging code, suggesting fixes, and generating mock data.
- The AI has improved the efficiency of the development process and the quality of the code.
- The AI has been used to generate skeleton code for styles and components, which has saved time and effort.

## Usage in Components / Execution

### Activity.js

In the `Activity.js` file, AI was used to assist in several ways:

- AI was used to generate skeleton code for the styles of the `AccordionDetails` component. The AI generated the styles for the maximum height, overflow, and scrollbar display. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like px, auto were added to the generated code
- [Skeleton Code](#skeleton-code)

```javascript
<AccordionDetails
    sx={{
        // ai-gen (ChatGPT-4.0, 1)
        maxHeight: "600px",
        overflow: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        // ai-gen end
    }}
>
```

- AI was used to generate skeleton code for the styles of the `Card` component. The AI generated the styles for the background, border radius, color, and overflowY. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like px, hidden were added to the generated code
- [Skeleton Code](#skeleton-code)

```javascript
<Card
   sx={{
      // ai-gen (ChatGPT-4.0, 1)
      background: theme.palette.background.paper,
      borderRadius: "16px",
      color: theme.palette.text.primary,
      overflow: "hidden",
      height: "600px",
      // ai-gen end
   }}
>
```

### AddExpense.js

In the `AddExpense.js` file, AI was used to assist in several ways:

- AI was used to generate skeleton code for styles of the `Box` component that wraps the form. The AI generated the styles for the TextField root, padding, display, and flexDirection. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which m, width, p were added to the generated code
- [Skeleton Code](#skeleton-code)

```javascript
<Box
   // ai-gen start (ChatGPT-4.0, 1)
   component="form"
   sx={{
      "& .MuiTextField-root": { m: 1, width: "25ch" },
      p: 2,
      display: "flex",
      flexDirection: "column",
   }}
   // ai-gen end
   noValidate={false} // do extra validation
   autoComplete="off"
   onSubmit={handleSubmit}
>
```

- AI was used to generate the styles for the `Select` component for the User Name field. The AI generated the styles for the disabled state of the Select component. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human.
- [Skeleton Code](#skeleton-code)

```javascript
sx={{
        // ai-gen start (ChatGPT-4.0, 0)
        "&.Mui-disabled": {
         color: "black",
         backgroundColor: "#ddd",
        },
        // ai-gen end
       }}
```

## DataGen.js

In the `DataGen.js` file, AI was used to assist in several ways:

- AI was used to generate the `randomDate` function. This function generates a random date between two given dates. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human.
- [Generated code / Mock Data](#mock-data)

```javascript
// ai-gen start (ChatGPT-4.0, 0)

export function randomDate(start, end) {
 return new Date(
  start.getTime() + Math.random() * (end.getTime() - start.getTime())
 );
}
// ai-gen end

```

- AI was used to generate part of the `generateData` function. Specifically, the AI generated the code to create a random number of activities for each category. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like * 10, description, type were added to the generated code.
- [Generated code / Mock Data](#mock-data)
- [Skeleton Code](#skeleton-code)
- [Complex Feature](#complex-feature)

```javascript
// ai-gen start (ChatGPT-4.0, 1)
 categories.forEach((category) => {
  activitiesData[category] = Array.from(
   { length: Math.floor(Math.random() * 10) },
   (_, id) => {
    let description = `${category} ${id}`;
    let payer, payee;
    const type = ["owe", "paid", "get back"][
     Math.floor(Math.random() * 3)
    ];
    // ai gen end
```

## ExpensePage.js

In the `ExpensePage.js` file, AI was used to assist in several ways:

- AI was used to generate the `calculateTotal` function. This function calculates the total expense for each category. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 0)
export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
// ai-gen end
```

- AI was used to generate part of the `renderExpenses` function. Specifically, the AI generated the code to map over the expenses and render each one. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which the only AI code is the .map() function, the <ExpenseItem ...> is added by a human.
- [skeleton code](#skeleton-code)

```javascript
   // ai-gen start (ChatGPT-4.0, 1)

expenses.map((expense) => (
  <ExpenseItem key={expense.id} expense={expense} />
))
// ai-gen end
```

## History.js

In the `History.js` file, AI was used to assist in several ways:

- AI was used to generate the `flattenTransactions` function. This function flattens the transactions object. This is marked with the comment `ai-gen (chatGPT 4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like transaction && were added to the generated code.
- [Complex Feature](#complex-feature)
- [Bug Fix](#bug-fix)

```javascript
// ai-gen start (chatGPT 4.0, 1)
function flattenTransactions(transactions) {
    return transactions && typeof transactions === "object" // Check if transactions is an object bc it can be null
        ? Object.values(transactions).flat()
        : [];
}
// ai-gen end
```

- AI was used to generate part of the `History component`. Specifically, the AI generated the code to set the background and border radius of the Card component. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like 16px, hidden were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 1)
<Card
    sx={{
        background: theme.palette.background.paper,
        borderRadius: "16px",
        color: theme.palette.text.primary,
        overflow: "hidden",
    }}
>
// ai-gen end
```

- AI was used to generate part of the `History component`. Specifically, the AI generated the code to set the overflow and maxHeight of the AccordionDetails component. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like 200px, auto were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 1)
<AccordionDetails
    sx={{
        maxHeight: "200px",
        overflow: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    }}
>
// ai-gen end
```

- AI was used to generate part of the `History component`. Specifically, the AI generated the code to set the key of the ListItem component. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like transaction.amount, transaction.date were added to the generated code.
- [Bug Fix](#bug-fix)
- [Skeleton Code](#skeleton-code)

```javascript
   // ai-gen start (ChatGPT-4.0, 1)

<ListItem
    key={`${transaction.id}-${transaction.amount}-${transaction.date}-${index}`}
>
   // ai-gen end
```

- AI was used to generate part of the `History component`. Specifically, the AI generated the code to set the overflow and maxHeight of the Paper component. This is marked with the comment `ai-gen (chatGPT 4, 2)` indicating that the AI generated code was slightly modified by a human in which those changes like auto, 48px were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (chatGPT 4, 2)
<Paper
    elevation={3}
    sx={{
        overflow: "auto",
        maxHeight: "calc(100vh - 48px)",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    }}
>
// ai-gen end
```

## ExpensesForm.js

In the `ExpensesForm.js` file, AI was used to assist in several ways:

- AI was used to generate the `useEffect()` function. This function is used to set the initial state of the form. This is marked with the comment `ai-gen (ChatGPT-4.0, 2)` indicating that the AI generated code was heavily modified by a human in which the `|| ""` were the only code generated by AI.
- [Bug Fix](#bug-fix)

```javascript
// ai-gen start (ChatGPT-4.0, 2)
  setFilteredExpenses(
   expensesData.filter((expense) => {
    if (searchType === "payer") {
     return (expense.payer || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
    } else if (searchType === "name") {
     return (expense.name || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
    }
    return true;
   })
   // ai-gen end
```

- AI was used to generate the `ExpenseForms` component. This code generates the form for adding a new expense. This is marked with the comment `ai-gen (ChatGPT-4.0, 2)` indicating that the AI generated code was heavily modified by a human in which all of the sx were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 2)
  // Container = used to center the content and set the max-width
  <Container maxWidth="xl" sx={{ mt: 4 }}>
   {/* Paper = used to create a surface to display the content */}
   <Paper elevation={3} sx={{ mb: 2 }}>
    {/* AppBar = used to create a header for the content */}
    <AppBar
     position="static"
     color="inherit"
     elevation={0}
     sx={{
      border: "inherit",
      borderColor: "text.primary",
      borderRadius: 2,
      maxHeight: "400px",
      paddingBottom: 2,
      paddingTop: 2,
     }}
    >
     {/* Toolbar = used to create a container for the content */}
     <Toolbar>
      {/* ai-gen end */}
```

- AI was used to generate the `renderCell` function. This function is used to render the cells in the table. This is marked with the comment `ai-gen (ChatGPT-4.0, 2)` indicating that the AI generated code was heavily modified by a human in which the NewExpenseDialog, onClick() were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 2)
     renderCell: (params) => {
      if (col.field === "actions") {
       return (
        // Box = used to create a container for the content
        // this will be like div in html but with more features
        <Box display="flex" flexDirection="row">
         <NewExpenseDialog
          onAddExpense={handleAddExpense}
          onEditExpense={handleEditExpense}
          expense={dialogExpense}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          newData={false}
         />
         {/* delete button*/}
         <Button
          onClick={() => handleRemoveExpense(params.value)}
         >
          <DeleteIcon />
         </Button>
        </Box>
       );
      }
      // return the value of the cell if it is not the actions column
      return params.value;
     },
     // ai-gen end
```

## NewExpenseDialog.js

In the `NewExpenseDialog.js` file, AI was used to assist in several ways:

- AI was used to generate the `formatDateForInput` function. This function formats a date object into a string that can be used as the value of an input element. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like those if() were added to the generated code.
- [Generated code / Mock Data](#mock-data)
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 1)
const formatDateForInput = (date) => {
 const d = new Date(date);
 let month = "" + (d.getMonth() + 1),
  day = "" + d.getDate(),
  year = d.getFullYear();

 if (month.length < 2) month = "0" + month;
 if (day.length < 2) day = "0" + day;

 return [year, month, day].join("-");
};
// ai-gen end
```

- AI was used to generate the `ClearForm()` function. This function clears the form fields. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human as this is bug fix code from AI that work in the ClearForm() function.
- [Bug Fix](#bug-fix)

```javascript
// ai-gen start (ChatGPT-4.0, 0)
  setDate(formatDateForInput(new Date()));
// ai-gen end
```

- AI was used to generate the `TextField` component for the Date field. This code sets the value and onChange handler for the Date field. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human as this is bug fix code cause by empty field from AI that work in the TextField component.
- [Bug Fix](#bug-fix)

```javascript
// ai-gen start (ChatGPT-4.0, 0)
      value={name || ""}
// ai-gen end
```

- Same as above, AI was used to generate the `TextField` component for the Amount field. This code sets the value and onChange handler for the Amount field. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human as this is bug fix code cause by empty field from AI that work in the TextField component.
- [Bug Fix](#bug-fix)
  
```javascript
// ai-gen start (ChatGPT-4.0, 0)
      value={amount || ""}
// ai-gen end
```

- Same as above, AI was used to generate the `TextField` component for the Payer field. This code sets the value and onChange handler for the Payer field. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human as this is bug fix code cause by empty field from AI that work in the TextField component.
- [Bug Fix](#bug-fix)

```javascript
// ai-gen start (ChatGPT-4.0, 0)
      value={payer || ""}
// ai-gen end
```

- Same as above, AI was used to generate the `TextField` component for the Date field. This code sets the value and onChange handler for the Date field. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human as this is bug fix code cause by empty field from AI that work in the TextField component.
- [Bug Fix](#bug-fix)

```javascript
// ai-gen start (ChatGPT-4.0, 0)
      value={date || formatDateForInput(new Date())}
      onChange={(e) => setDate(e.target.value)}
// ai-gen end
```

- Same as above, AI was used to generate the `TextField` component for the Description field. This code will set the helper text for the Description field in which it will keep track of letters user enter and see if it reach limit = 300 or not. This is marked with the comment `ai-gen (ChatGPT-4.0, 0)` indicating that the AI generated code was not modified by a human.
- [Complex Feature](#complex-feature)

```javascript
// ai-gen start (ChatGPT-4.0, 0)
      helperText={`${
       description ? description.split(" ").length : 0
      }/300`}
// ai-gen end
```

## AddPersonDialog.js

In the `AddPersonDialog.js` file, AI was used to assist in several ways:

- AI was used to generate the 'updatePeople' function. This function updates the people array with the new person. This is marked with the comment `ai-gen (ChatGPT-3.5, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like person.id, event.target.value were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-3.5, 1)
  const updatedPeople = people.map((p) =>
   p.id === person.id ? { ...p, splitMethod: event.target.value } : p
  );
   setPeople(updatedPeople);
// ai-gen end
```

## ExpensesSplit.js

In the `ExpensesSplit.js` file, AI was used to assist in several ways:

- AI was used to generate the `renderCell` function. This function is used to render the cells in the table. This is marked with the comment `ai-gen (ChatGPT-4.0, 2)` indicating that the AI generated code was heavily modified by a human in which human code are if(!person.splitMethod), onClick() (2x)were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
{/*/ ai-gen start (ChatGPT-4.0, 2)*/}
     <EditIcon
      color="primary"
      onClick={() => {
       const person = {
        ...people.find((p) => p.id === params.row.id),
       };
       if (!person.splitMethod) {
        person.splitMethod = "equal"; // Set a default value
       }
       setCurrentRow({ ...person });
       setDetailDialogOpen(true);
      }}
      style={{ cursor: "pointer", marginRight: "30px" }}
     />
     <DeleteIcon
      color="primary"
      onClick={() => handleDelete(params.row.id)}
      style={{ cursor: "pointer" }}
     />
     {/*/ ai-gen end */}
```

- AI was used to generate the `ExpenseSplit` component. This code component is used to display the split details for each person. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like all sx and elevation were added after generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 1)
  <Container maxWidth="xl" sx={{ mt: 4 }}>
   <Paper elevation={3} sx={{ mb: 2 }}>
    <AppBar position="static" color="inherit" elevation={0}>
     <Toolbar>
      {/* ai-gen end */}
```

## TripList.js

In the `TripList.js` file, AI was used to assist in several ways:

- AI was used to generate the `Grid` component for the TripList. This code sets the key and link for each trip. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like xs, sm, md were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
// ai-gen start (ChatGPT-4.0, 1)
       <Grid item xs={12} sm={6} md={3} key={index}>
        <Card component={Link} to={trip.link}>
         {/* ai-gen end */}
```

- AI was used to generate the `Box` component for the TripList. This code sets the elevation and sx for the Card component. This is marked with the comment `ai-gen (ChatGPT-4.0, 1)` indicating that the AI generated code was slightly modified by a human in which those changes like top, bottom, right, left, alignItems, justifyContent and opacity were added to the generated code.
- [Skeleton Code](#skeleton-code)

```javascript
{/* ai-gen start (ChatGPT-4.0, 1) */}
          <Box
           component="div"
           sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "black",
            color: "white",
            opacity: 0.6,
           }}
          >
           {/* ai-gen end */}
```
