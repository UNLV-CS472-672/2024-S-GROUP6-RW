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

func CreateInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to create an invoice.\n", time.Now())

	var invoice models.Invoice

	if !models.BindData(c, &invoice) {
		return // Failed to bind data to invoice
	}

	database := db.GetMongoDatabase()

	_, err := business.CreateInvoice(invoice, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func GetAllInvoicesHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get all invoices.\n", time.Now())

	var trip models.Trip

	if !models.BindData(c, &trip) {
		return // Failed to bind data to trip
	}

	database := db.GetMongoDatabase()

	invoiceList, err := business.GetAllInvoices(trip, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, invoiceList)
}

func GetInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to get invoice details.\n", time.Now())

	var invoice models.Invoice

	if !models.BindData(c, &invoice) {
		return // Failed to bind data to invoice
	}

	database := db.GetMongoDatabase()

	invoiceResult, err := business.GetInvoice(invoice, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, invoiceResult)
}

func EditInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to edit an invoice.\n", time.Now())

	var invoice models.Invoice

	if !models.BindData(c, &invoice) {
		return // Failed to bind data to invoice
	}

	database := db.GetMongoDatabase()

	_, err := business.EditInvoice(invoice, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}

func DeleteInvoiceHandler(c *gin.Context) {
	fmt.Printf("%s | Attempting to delete an invoice.\n", time.Now())

	var invoice models.Invoice

	if !models.BindData(c, &invoice) {
		return // Failed to bind data to invoice
	}

	database := db.GetMongoDatabase()

	err := business.DeleteInvoice(invoice, database)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Success.")

	// Return OK status to client
	c.JSON(http.StatusOK, gin.H{})
}
