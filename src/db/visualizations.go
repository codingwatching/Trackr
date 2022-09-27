package db

import (
	"fmt"
	"gorm.io/gorm"

	"trackr/src/models"
)

type VisulizationServiceDB struct {
	database *gorm.DB
}

func (service *VisulizationServiceDB) GetVisualizations(project models.Project, user models.User) ([]models.Visualization, error) {
	var visualizations []models.Visualization
	if result := service.database.Model(&models.Visualization{}).Joins("LEFT JOIN projects").Find(&visualizations, "visualizations.project_id = ? AND projects.user_id = ?", project.ID, user.ID); result.Error != nil {
		return nil, result.Error
	}

	return fields, nil
}

func (service *VisulizationServiceDB) GetVisualization(id uint, user models.User) (*models.Visualization, error) {
	var visualization models.Visualization
	if result := service.database.Model(&models.Visualization{}).Joins("LEFT JOIN projects").First(&visualization, "fields.id = ? AND projects.user_id = ?", id, user.ID); result.Error != nil {
		return nil, result.Error
	}

	return &field, nil
}

func (service *VisulizationServiceDB) AddVisualization(visualization models.Visualization) error {
	if result := service.database.Create(&visualization); result.Error != nil {
		return result.Error
	}

	return nil
}

func (service *VisulizationServiceDB) UpdateVisualization(visualization models.Visualization) error {
	if result := service.database.Save(&visualization); result.Error != nil {
		return result.Error
	}
	return nil
}

func (service *VisulizationServiceDB) DeleteVisualization(id uint, user models.User) error {
	result := service.database.Model(&models.Field{}).Joins("LEFT JOIN projects").Delete(&models.Field{}, "visualizations.id = ? AND projects.user_id = ?", id, user.ID)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
