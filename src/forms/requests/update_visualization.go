package requests

type UpdateVisualization struct {
	ID       uint   `json:"id"`
	Metadata string `json:"metadata"`
}
