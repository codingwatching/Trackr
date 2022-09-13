package db

import (
	"gorm.io/gorm"

	"trackr/src/models"
)

type UserServiceDB struct {
	database *gorm.DB
}

func (service *UserServiceDB) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if result := service.database.First(&user, "email = ?", email); result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func (service *UserServiceDB) GetNumberOfUsersByEmail(email string) (int64, error) {
	var count int64
	if result := service.database.Model(&models.User{}).Where("email = ?", email).Count(&count); result.Error != nil {
		return 0, result.Error
	}

	return count, nil
}

func (service *UserServiceDB) AddUser(user models.User) error {
	if result := service.database.Create(&user); result.Error != nil {
		return result.Error
	}

	return nil
}
