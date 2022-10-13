package responses

import "time"

type Visualization struct {
	ID        uint      `json:"id"`
	Metadata  string    `json:"metadata"`
	UpdatedAt time.Time `json:"updatedAt"`
	CreatedAt time.Time `json:"createdAt"`
}
