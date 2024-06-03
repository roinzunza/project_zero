package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"reflect"
	"time"

	"github.com/gin-gonic/gin"
)

/*

Create Fragment
Edit Fragment
Delete Fragment

create account
edit account
delete account

Fragment attributes
- date
- text
- Likes
- dislikes
- share

	// POST new Fragment entry
	// update id for the account upadte_id -> user account id

	// Get all Fragments for a user id

	// Edit Fragment using id from user id
	// edit allows for one edit and will contain same likes and dislikes from previous
	// edit will contain edit stamp along with time it was edited

*/

type Fragment struct {
	Id         int
	Content    string
	Date       time.Time
	Likes      int
	Dislikes   int
	Views      int
	Hashtags   []string
	Edited     bool
	EditedDate time.Time
}

type User struct {
	Id              int
	Name            string
	Bio             string
	DateCreated     time.Time
	TotalFragments  int
	TotalLikes      int
	TotalDislikes   int
	TotalViews      int
	Followers       int
	SharedFragments int
}

func testFragment() {
	// Creating a new Fragment entry
	FragmentEntry := Fragment{
		Id:       1,
		Content:  "This is the content of my first Fragment entry.",
		Date:     time.Now(),
		Likes:    0,
		Dislikes: 20,
		Views:    0,
		Hashtags: []string{"#first", "#Fragment"},
		Edited:   false,
		// Placeholder value for EditedDate
		EditedDate: time.Time{},
	}
	// Iterate over the fields of the Fragment struct
	v := reflect.ValueOf(FragmentEntry)
	t := v.Type()
	for i := 0; i < v.NumField(); i++ {
		field := t.Field(i)
		value := v.Field(i).Interface()
		fmt.Printf("%s: %v\n", field.Name, value)
	}
}

// Function to find the last ID in the fragments and return the next available ID
func getNextID(fragments []Fragment) int {
	lastID := 0
	for _, fragment := range fragments {
		if fragment.Id > lastID {
			lastID = fragment.Id
		}
	}
	return lastID + 1
}

// Function to process a new fragment
func processNewFragment(content string) error {
	// Get fragments from the JSON file
	fragments, err := getFragments()
	if err != nil {
		return err
	}

	// Get the next available ID
	nextID := getNextID(fragments)

	// Create the new fragment with the next available ID
	newFragment := Fragment{
		Id:         nextID,
		Content:    content,
		Date:       time.Now(),
		Likes:      0,
		Dislikes:   0,          // Assuming initial values
		Views:      0,          // Assuming initial values
		Hashtags:   []string{}, // Assuming initial values
		Edited:     false,
		EditedDate: time.Time{}, // Assuming initial values
	}

	// Add the new fragment to the fragments slice
	fragments = append(fragments, newFragment)

	// Marshal the fragments slice back to JSON
	newData, err := json.MarshalIndent(fragments, "", "    ")
	if err != nil {
		return fmt.Errorf("error marshalling JSON: %v", err)
	}

	// Write the updated JSON data back to the file
	err = os.WriteFile("fragments.json", newData, 0644)
	if err != nil {
		return fmt.Errorf("error writing to file: %v", err)
	}

	return nil
}

// Function to get fragments from the JSON file
func getFragments() ([]Fragment, error) {
	// Open the JSON file
	file, err := os.Open("fragments.json")
	if err != nil {
		return nil, fmt.Errorf("error opening file: %v", err)
	}
	defer file.Close()

	// Read the JSON data from the file
	data, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("error reading file: %v", err)
	}

	// Unmarshal the JSON data into a slice of Fragment structs
	var fragments []Fragment
	err = json.Unmarshal(data, &fragments)
	if err != nil {
		return nil, fmt.Errorf("error decoding JSON: %v", err)
	}

	return fragments, nil
}

func main() {
	fmt.Printf("Project zero")
	testFragment()

	// Create a Gin router
	r := gin.Default()

	// Enable CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	})

	// Define routes
	r.GET("/hello", helloGetHandler)
	// Define a route to handle requests to /fragments endpoint
	r.GET("/fragments", fragmentGetHandler)
	r.POST("/new_fragment", fragmentPostHandler)

	// Run the server
	r.Run(":8080")

}

// Handler for GET /hello endpoint
func helloGetHandler(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"message": "Hello, GET request received!",
	})
}

func fragmentGetHandler(c *gin.Context) {
	/* returns all the fragments from the user as an array */
	// Get fragments from the JSON file
	fragments, err := getFragments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get fragments",
		})
		return
	}
	// Return the fragmentList as JSON response with "message" and "data" fields
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
		"data":    fragments,
	})

}

// Handler for POST /new_fragment endpoint
func fragmentPostHandler(c *gin.Context) {
	// Define a struct to represent the incoming JSON data
	var request struct {
		Content string `json:"content"`
	}

	// Parse JSON from request body into the defined struct
	if err := c.BindJSON(&request); err != nil {
		// Return a 400 Bad Request response if there is an error parsing the JSON
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Now you can access the content from the request struct
	content := request.Content

	// Here you can add the content to your existing fragments or perform any other operations
	// write the fragment to the json file
	err := processNewFragment(content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error processing new fragments",
		})
		return
	}

	// Respond with a success message
	c.JSON(http.StatusOK, gin.H{
		"message": "New fragment added successfully",
		"content": content, // Return the content in the response if needed
	})
}
