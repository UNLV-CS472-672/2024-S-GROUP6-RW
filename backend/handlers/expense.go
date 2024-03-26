package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create an expense.\n", time.Now())

	// TODO: Implement expense creation behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get expense details.\n", time.Now())

	// TODO: Implement expense retrieval behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func EditExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit an expense.\n", time.Now())

	// TODO: Implement expense edit behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteExpenseHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete an expense.\n", time.Now())

	// TODO: Implement expense deletion behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
