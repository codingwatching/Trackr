package requests

type AddValue struct {
	APIKey  string `json:"apiKey"`
	FieldID uint   `json:"fieldId"`
	Value   string `json:"value"`
}
