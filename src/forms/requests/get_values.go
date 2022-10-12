package requests

type GetValues struct {
	FieldID uint `json:"fieldId"`

	Order  string `json:"order"`
	Offset int    `json:"offset"`
	Limit  int    `json:"limit"`
}
