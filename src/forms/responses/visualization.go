package responses

import "time"

type Visualization struct {
	ID        uint   `json:"id"`
	FieldID   uint   `json:"fieldId"`
	FieldName string `json:"fieldName"`
	Metadata  string `json:"metadata"`

	UpdatedAt time.Time `json:"updatedAt"`
	CreatedAt time.Time `json:"createdAt"`
}
