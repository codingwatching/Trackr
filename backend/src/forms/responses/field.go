package responses

import "time"

type Field struct {
	ID             uint      `json:"id"`
	Name           string    `json:"name"`
	NumberOfValues int64     `json:"numberOfValues"`
	CreatedAt      time.Time `json:"createdAt"`
}
