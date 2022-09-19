package db

import (
	"fmt"
	"gorm.io/gorm"

	"trackr/src/models"
)

type FieldServiceDB struct {
	database *gorm.DB
}

func (service *FieldServiceDB) GetFieldsByProjectIdAndUser(projectId uint, user models.User) ([]models.Field, error) {
	var fields []models.Field
	if result := service.database.Find(&fields, "project_id = ?", projectId).Joins("LEFT JOIN projects ON projects.user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return fields, nil
}

func (service *FieldServiceDB) GetFieldByIdAndUser(id uint, user models.User) (*models.Field, error) {
	var field models.Field
	if result := service.database.First(&field, "id = ?", id).Joins("LEFT JOIN projects ON projects.user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return &field, nil
}

func (service *FieldServiceDB) AddField(field models.Field) error {
	if result := service.database.Create(&field); result.Error != nil {
		return result.Error
	}

	return nil
}

func (service *FieldServiceDB) UpdateField(field models.Field) error {
	if result := service.database.Save(&field); result.Error != nil {
		return result.Error
	}
	return nil
}

func (service *FieldServiceDB) DeleteFieldByIdAndUser(id uint, user models.User) error {
	result := service.database.Model(&models.Field{}).Where("id = ?", id).Joins("LEFT JOIN projects ON projects.user_id = ?", user.ID).Delete(&models.Field{})
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no field was deleted")
	}

	return nil
}
