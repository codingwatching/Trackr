package db

import (
	"time"

	"gorm.io/gorm"

	"trackr/src/models"
)

type LogService struct {
	DB *gorm.DB
}

func (service *LogService) GetLogs(user models.User) ([]models.Log, error) {
	var logs []models.Log
	if result := service.DB.Preload("Project").Order("created_at DESC").Find(&logs, "user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return logs, nil
}

func (service *LogService) AddLog(message string, user models.User, projectId *uint) error {
	log := models.Log{
		Message:   message,
		CreatedAt: time.Now(),

		User:      user,
		ProjectID: projectId,
	}

	if result := service.DB.Create(&log); result.Error != nil {
		return result.Error
	}

	return nil
}
