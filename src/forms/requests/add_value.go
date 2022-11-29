package requests

type AddValue struct {
	APIKey  string `form:"apiKey"`
	FieldID uint   `form:"fieldId"`
	Value   string `form:"value"`
}
