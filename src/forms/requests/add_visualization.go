package requests

type AddVisualization struct {
	ProjectID uint   `json:"projectId"`
	Metadata  string `json:"metadata"`
}
