package db

import (
	"fmt"
	"gorm.io/gorm"

	"trackr/src/models"
)

type LogsServiceDB struct {
	database *gorm.DB
}

func (service *LogsServiceDB) GetUserLogs(user models.User) ([]models.Log, error) {
	var logs []models.Log
	if result := service.database.Find(&logs, "user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return logs, nil
}

func (service *LogsServiceDB) GetProjectLogs(project models.Project, user models.User) ([]models.Visualization, error) {
	var logs []models.Log
	if result := service.database.Model(&models.Visualization{}).Joins("LEFT JOIN projects").Find(&logs, "logs.project_id = ? AND logs.user_id = ?", project.ID, user.ID); result.Error != nil {
		return nil, result.Error
	}

	return logs, nil
}