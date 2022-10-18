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

	if result := service.database.Model(&models.Visualization{}).Joins("LEFT JOIN projects ON visualizations.project_id = projects.id").Find(
		&visualizations, "visualizations.project_id = ? AND projects.user_id = ?", project.ID, user.ID,
	); result.Error != nil {
		return nil, result.Error
	}

	return visualizations, nil
}

func (service *VisulizationServiceDB) GetVisualization(id uint, user models.User) (*models.Visualization, error) {
	var visualization models.Visualization
	if result := service.database.Model(&models.Visualization{}).Joins("LEFT JOIN projects ON visualizations.project_id = projects.id").First(
		&visualization, "visualizations.id = ? AND projects.user_id = ?", id, user.ID,
	); result.Error != nil {
		return nil, result.Error
	}

	return &visualization, nil
}

func (service *VisulizationServiceDB) AddVisualization(visualization models.Visualization) (uint, error) {
	if result := service.database.Create(&visualization); result.Error != nil {
		return 0, result.Error
	}

	return visualization.ID, nil
}

func (service *VisulizationServiceDB) UpdateVisualization(visualization models.Visualization) error {
	if result := service.database.Save(&visualization); result.Error != nil {
		return result.Error
	}
	return nil
}

func (service *VisulizationServiceDB) DeleteVisualization(visualization models.Visualization) error {
	result := service.database.Delete(visualization)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
