package services

import "trackr/src/models"

type SessionService interface {
	GetSessionAndUserById(id string) (*models.Session, *models.User, error)
	AddSession(session models.Session) error
	DeleteSessionByIdAndUser(id string, user models.User) error
	DeleteExpiredSessionsByUser(user models.User) error
}
