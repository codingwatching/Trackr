package db

import (
	"time"

	"gorm.io/gorm"

	"trackr/src/models"
)

type LogsServiceDB struct {
	database *gorm.DB
}

func (service *LogsServiceDB) GetLogs(user models.User) ([]models.Log, error) {
	var logs []models.Log
	if result := service.database.Preload("Project").Order("created_at DESC").Find(&logs, "user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return logs, nil
}

func (service *LogsServiceDB) AddLog(message string, user models.User, project *models.Project) error {
	var projectId *uint
	if project != nil {
		projectId = &project.ID
	}

	log := models.Log{
		Message:   message,
		CreatedAt: time.Now(),

		User:      user,
		ProjectID: projectId,
	}

	if result := service.database.Create(&log); result.Error != nil {
		return result.Error
	}

	return nil
}
