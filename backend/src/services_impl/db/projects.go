package db

import (
	"fmt"
	"trackr/src/models"

	"gorm.io/gorm"
)

type ProjectService struct {
	DB *gorm.DB
}

func (service *ProjectService) GetProjects(user models.User) ([]models.Project, error) {
	var projects []models.Project
	if result := service.DB.Order("created_at DESC").Find(&projects, "user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return projects, nil
}

func (service *ProjectService) GetProject(id uint, user models.User) (*models.Project, error) {
	var project models.Project
	if result := service.DB.First(&project, "id = ? AND user_id = ?", id, user.ID); result.Error != nil {
		return nil, result.Error
	}

	return &project, nil
}

func (service *ProjectService) GetProjectByAPIKey(apiKey string) (*models.Project, error) {
	var project models.Project
	if result := service.DB.Preload("User").First(&project, "api_key = ?", apiKey); result.Error != nil {
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
	result := service.DB.Delete(&models.Project{}, "id = ? AND user_id = ?", id, user.ID)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
