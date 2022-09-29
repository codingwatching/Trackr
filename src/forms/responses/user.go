package responses

type User struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	MaxValues uint   `json:"maxValues"`
}
