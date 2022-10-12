package responses

import "time"

type Log struct {
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"createdAt"`
}
