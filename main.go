package main

import (
	"fmt"
	"time"
)

/*

Create journal
Edit Journal
Delete journal

create account
edit account
delete account

journal attributes
- date
- text
- Likes
- dislikes
- share

*/

type Journal struct {
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
	Id             int
	Name           string
	Bio            string
	DateCreated    time.Time
	TotalJournals  int
	TotalLikes     int
	TotalDislikes  int
	TotalViews     int
	Followers      int
	SharedJournals int
}

func main() {
	fmt.Printf("Project zero")

	// Creating a new Journal entry
	journalEntry := Journal{
		Id:       1,
		Content:  "This is the content of my first journal entry.",
		Date:     time.Now(),
		Likes:    0,
		Dislikes: 20,
		Views:    0,
		Hashtags: []string{"#first", "#journal"},
		Edited:   false,
		// Placeholder value for EditedDate
		EditedDate: time.Time{},
	}
	// Printing the journal entry
	fmt.Println("Journal Entry:")
	fmt.Println("ID:", journalEntry.Id)
	fmt.Println("Content:", journalEntry.Content)
	fmt.Println("Date:", journalEntry.Date)
	fmt.Println("Likes:", journalEntry.Likes)
	fmt.Println("Dislikes:", journalEntry.Dislikes)
	fmt.Println("Views:", journalEntry.Views)
	fmt.Println("Hashtags:", journalEntry.Hashtags)
	fmt.Println("Edited:", journalEntry.Edited)
	fmt.Println("Edited Date:", journalEntry.EditedDate)

	// POST new journal entry
	// update id for the account upadte_id -> user account id

	// Get all journals for a user id

	// Edit journal using id from user id
	// edit allows for one edit and will contain same likes and dislikes from previous
	// edit will contain edit stamp along with time it was edited

}
