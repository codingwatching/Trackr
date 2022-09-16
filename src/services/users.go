package services

import "trackr/src/models"

type UserService interface {
	GetUserByEmail(email string) (*models.User, error)
	GetNumberOfUsersByEmail(email string) (int64, error)
	AddUser(user models.User) error
	UpdateUser(user models.User) error
}
