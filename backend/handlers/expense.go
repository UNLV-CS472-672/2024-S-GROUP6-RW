package handlers

import (
	"backend/business"
	"backend/db"
	"backend/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create an expense.\n", time.Now())

	var expense models.Expense

	if !models.BindData(c, &expense) {
		return // Failed to bind data to expense
	}

	database := db.GetMongoDatabase()

	_, err := business.CreateExpense(expense, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetAllExpensesHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get all expenses.\n", time.Now())

	var trip models.Trip

	if !models.BindData(c, &trip) {
		return // Failed to bind data to trip
	}

	database := db.GetMongoDatabase()

	expenseList, err := business.GetAllExpenses(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, expenseList)
}

func GetExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get expense details.\n", time.Now())

	var expense models.Expense

	if !models.BindData(c, &expense) {
		return // Failed to bind data to expense
	}

	database := db.GetMongoDatabase()

	expenseResult, err := business.GetExpense(expense, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, expenseResult)
}

func EditExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit an expense.\n", time.Now())

	var expense models.Expense

	if !models.BindData(c, &expense) {
		return // Failed to bind data to expense
	}

	database := db.GetMongoDatabase()

	_, err := business.EditExpense(expense, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete an expense.\n", time.Now())

	var expense models.Expense

	if !models.BindData(c, &expense) {
		return // Failed to bind data to expense
	}

	database := db.GetMongoDatabase()

	err := business.DeleteExpense(expense, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
