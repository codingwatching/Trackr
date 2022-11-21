package responses

type User struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`

	NumberOfFields   int64 `json:"numberOfFields"`
	NumberOfValues   int64 `json:"numberOfValues"`
	MaxValueInterval int64 `json:"maxValueInterval"`
	MaxValues        int64 `json:"maxValues"`
}
