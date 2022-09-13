package services

import "trackr/src/models"

type ProjectService interface {
	GetProjectsByUser(user models.User) ([]models.Project, error)
	GetProjectByIdAndUser(id uint, user models.User) (*models.Project, error)
	AddProject(project models.Project) error
	UpdateProject(project models.Project) error
	DeleteProjectByIdAndUser(id uint, user models.User) error
}
