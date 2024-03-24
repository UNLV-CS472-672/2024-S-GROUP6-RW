package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create an activity.\n", time.Now())

	// TODO: Implement activity creation behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get activity details.\n", time.Now())

	// TODO: Implement activity retrieval behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func EditActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit an activity.\n", time.Now())

	// TODO: Implement activity edit behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteActivityHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete an activity.\n", time.Now())

	// TODO: Implement activity deletion behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
