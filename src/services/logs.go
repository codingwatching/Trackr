package services

import "trackr/src/models"

type LogsService interface {
	GetUserLogs(user models.User) ([]models.Log, error)
	GetProjectLogs(project models.Project, user models.User) ([]models.Log, error)
	AddLog(log models.Log) (uint, error)
}
