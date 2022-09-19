package requests

type AddField struct {
	ProjectId	uint	 `json:"project_id"`
	Name        string `json:"name"`
	Type			int	 `json:"type"`
	
}