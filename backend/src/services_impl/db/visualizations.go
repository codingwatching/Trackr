package db

import (
	"fmt"
	"gorm.io/gorm"

	"trackr/src/models"
)

type VisulizationService struct {
	DB *gorm.DB
}

func (service *VisulizationService) GetVisualizations(project models.Project, user models.User) ([]models.Visualization, error) {
	var visualizations []models.Visualization

	result := service.DB.Model(&models.Visualization{})
	result = result.Preload("Field")
	result = result.Joins("INNER JOIN fields ON `visualizations`.`field_id` = `fields`.`id`")
	result = result.Joins("INNER JOIN projects ON `fields`.`project_id` = `projects`.`id`")
	result = result.Find(&visualizations, "`projects`.`id` = ? AND `projects`.`user_id` = ?", project.ID, user.ID)

	if result.Error != nil {
		return nil, result.Error
	}

	return visualizations, nil
}

func (service *VisulizationService) GetVisualization(id uint, user models.User) (*models.Visualization, error) {
	var visualization models.Visualization

	result := service.DB.Model(&models.Visualization{})
	result = result.Joins("INNER JOIN fields ON `visualizations`.`field_id` = `fields`.`id`")
	result = result.Joins("INNER JOIN projects ON `fields`.`project_id` = `projects`.`id`")
	result = result.First(&visualization, "`visualizations`.`id` = ? AND `projects`.`user_id` = ?", id, user.ID)

	if result.Error != nil {
		return nil, result.Error
	}

	return &visualization, nil
}

func (service *VisulizationService) AddVisualization(visualization models.Visualization) (uint, error) {
	if result := service.DB.Create(&visualization); result.Error != nil {
		return 0, result.Error
	}

	return visualization.ID, nil
}

func (service *VisulizationService) UpdateVisualization(visualization models.Visualization) error {
	if result := service.DB.Save(&visualization); result.Error != nil {
		return result.Error
	}
	return nil
}

func (service *VisulizationService) DeleteVisualization(visualization models.Visualization) error {
	result := service.DB.Delete(visualization)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
