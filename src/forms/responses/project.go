package responses

import "time"

type Project struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	APIKey      string    `json:"apiKey"`
	CreatedAt   time.Time `json:"createdAt"`
}
