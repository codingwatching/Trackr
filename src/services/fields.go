package services

import "trackr/src/models"

type FieldService interface {
	AddField(field models.Field) error
	GetFieldsByProjectId(projectId uint) ([]models.Field, error)
	GetFieldByIdAndProject(id uint, project_id uint)(*models.Field, error)
	UpdateField(field models.Field) error
	DeleteFieldByIdAndProject( fieldId uint, projectId uint ) error
}