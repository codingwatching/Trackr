package services

import "trackr/src/models"

type LogsService interface {
	GetUserLogs(user models.User)
	GetProjectLogs(project models.Project, user models.User)
}
