package services

import (
	"trackr/src/models"
)

type LogsService interface {
	GetLogs(user models.User) ([]models.Log, error)
	AddLog(message string, user models.User, project *models.Project) error
}
