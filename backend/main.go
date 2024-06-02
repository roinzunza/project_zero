package main

import (
	"fmt"
	"time"
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

func main() {
	fmt.Printf("Project zero")

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
	// Printing the Fragment entry
	fmt.Println("Fragment Entry:")
	fmt.Println("ID:", FragmentEntry.Id)
	fmt.Println("Content:", FragmentEntry.Content)
	fmt.Println("Date:", FragmentEntry.Date)
	fmt.Println("Likes:", FragmentEntry.Likes)
	fmt.Println("Dislikes:", FragmentEntry.Dislikes)
	fmt.Println("Views:", FragmentEntry.Views)
	fmt.Println("Hashtags:", FragmentEntry.Hashtags)
	fmt.Println("Edited:", FragmentEntry.Edited)
	fmt.Println("Edited Date:", FragmentEntry.EditedDate)

	// POST new Fragment entry
	// update id for the account upadte_id -> user account id

	// Get all Fragments for a user id

	// Edit Fragment using id from user id
	// edit allows for one edit and will contain same likes and dislikes from previous
	// edit will contain edit stamp along with time it was edited

}
