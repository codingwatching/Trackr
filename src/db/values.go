package db

import (
	"fmt"

	"gorm.io/gorm"

	"trackr/src/models"
)

type ValueServiceDB struct {
	database *gorm.DB
}

func (service *ValueServiceDB) GetValues(field models.Field, user models.User, order string, offset int, limit int) ([]models.Value, error) {
	var values []models.Value

	result := service.database.Model(&models.Value{})
	result = result.Joins("LEFT JOIN fields")
	result = result.Joins("LEFT JOIN projects")

	if order == "asc" {
		result = result.Order("`values`.`created_at` ASC")
	} else if order == "desc" {
		result = result.Order("`values`.`created_at` DESC")
	} else {
		return nil, fmt.Errorf("invalid order")
	}

	if offset > 0 {
		result = result.Offset(offset)
	}

	if limit > 0 {
		result = result.Limit(limit)
	}

	result = result.Find(&values, "`values`.`field_id` = ? AND `projects`.`user_id` = ?", field.ID, user.ID)

	if result.Error != nil {
		return nil, result.Error
	}

	return values, nil
}

func (service *ValueServiceDB) GetValue(id uint, user models.User) (*models.Value, error) {
	var value models.Value

	result := service.database.Model(&models.Value{})
	result = result.Joins("LEFT JOIN fields")
	result = result.Joins("LEFT JOIN projects")
	result = result.First(&value, "`values`.`id` = ? AND `projects`.`user_id` = ?", id, user.ID)

	if result.Error != nil {
		return nil, result.Error
	}

	return &value, nil
}

func (service *ValueServiceDB) AddValue(value models.Value) error {
	if result := service.database.Create(&value); result.Error != nil {
		return result.Error
	}

	return nil
}

func (service *ValueServiceDB) DeleteValue(value models.Value) error {
	result := service.database.Delete(&value)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
