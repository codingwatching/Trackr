package requests

type UpdateField struct {
	FieldId		uint  `json:"field_id"`
	ProjectId	uint	 `json:"project_id"`
	Name        string `json:"name"`	
}