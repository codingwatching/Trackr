package responses

type User struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	MaxValues uint   `json:"maxValues"`
}
