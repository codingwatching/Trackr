package db

import (
	"fmt"
	"gorm.io/gorm"
	"trackr/src/models"
)

type UserService struct {
	DB *gorm.DB
}

func (service *UserService) GetUser(email string) (*models.User, error) {
	var user models.User

	if result := service.DB.First(&user, "email = ?", email); result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func (service *UserService) GetNumberOfUsers(email string) (int64, error) {
	var count int64

	if result := service.DB.Model(&models.User{}).Where("email = ?", email).Count(&count); result.Error != nil {
		return 0, result.Error
	}

	return count, nil
}

func (service *UserService) AddUser(user models.User) (uint, error) {
	if result := service.DB.Create(&user); result.Error != nil {
		return 0, result.Error
	}

	return user.ID, nil
}

func (service *UserService) DeleteUser(user models.User) error {
	result := service.DB.Delete(&user)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}

func (service *UserService) UpdateUser(user models.User) error {
	if result := service.DB.Save(&user); result.Error != nil {
		return result.Error
	}

	return nil
}
