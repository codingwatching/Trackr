package services

import "trackr/src/models"

type ValueService interface {
	GetValues(field models.Field, user models.User, order string, offset int, limit int) ([]models.Value, error)
	GetValue(id uint, user models.User) (*models.Value, error)
	AddValue(value models.Value) error
	DeleteValue(value models.Value) error
}
