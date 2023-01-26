package db

import (
	"fmt"
	"gorm.io/gorm"
	"trackr/src/models"
)

type ProjectService struct {
	DB *gorm.DB
}

func (service *ProjectService) GetProjects(user models.User) ([]models.Project, error) {
	var projects []models.Project

	if err := service.DB.
		Order("created_at DESC").
		Model(&user).
		Association("Projects").
		Find(&projects); err != nil {
		return nil, err
	}

	return projects, nil
}

func (service *ProjectService) GetProject(id uint, user models.User) (*models.Project, error) {
	var project models.Project

	if err := service.DB.
		Model(&user).
		Association("Projects").
		Find(&project, "id = ?", id); err != nil {
		return nil, err
	}

	return &project, nil
}

func (service *ProjectService) GetProjectByAPIKey(apiKey string) (*models.Project, error) {
	var project models.Project

	if result := service.DB.
		Preload("Users").
		First(&project, "api_key = ?", apiKey); result.Error != nil {
		return nil, result.Error
	}

	return &project, nil
}

func (service *ProjectService) AddProject(project models.Project) (uint, error) {
	if result := service.DB.Create(&project); result.Error != nil {
		return 0, result.Error
	}

	return project.ID, nil
}

func (service *ProjectService) UpdateProject(project models.Project) error {
	if result := service.DB.Save(&project); result.Error != nil {
		return result.Error
	}

	return nil
}

func (service *ProjectService) DeleteProject(id uint, user models.User) error {
	if result := service.DB.
		Model(&user).
		Delete(&models.Project{}, "id = ?", id); result.Error != nil {
		return result.Error
	} else if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
