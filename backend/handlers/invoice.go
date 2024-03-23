package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create an invoice.\n", time.Now())

	// TODO: Implement invoice creation behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get invoice details.\n", time.Now())

	// TODO: Implement invoice retrieval behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func EditInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit an invoice.\n", time.Now())

	// TODO: Implement invoice edit behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete an invoice.\n", time.Now())

	// TODO: Implement invoice deletion behavior

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
