package db

import (
	"fmt"
	"trackr/src/models"

	"gorm.io/gorm"
)

type FieldServiceDB struct {
	database *gorm.DB
}

func (service *FieldServiceDB) AddField(field models.Field) error {
	if result := service.database.Create(&field); result.Error != nil {
		return result.Error
	}

	return nil
}


func (service *FieldServiceDB) GetFieldsByProjectId(projectId uint) ([]models.Field, error){
	var fields []models.Field
	if result := service.database.Find(&fields, "project_id = ?", projectId); result.Error != nil {
		return nil, result.Error
	}

	return fields, nil
}


func (service *FieldServiceDB) GetFieldByIdAndProject(id uint, project_id uint) (*models.Field, error) {
	var field models.Field
	if result := service.database.First(&field, "id = ? AND project_id = ?", id, project_id); result.Error != nil {
		return nil, result.Error
	}

	return &field, nil
}

func (service *FieldServiceDB) UpdateField(field models.Field) error{
	if result := service.database.Save(&field); result.Error != nil {
		return result.Error
	}
	return nil
}

func (service *FieldServiceDB) DeleteFieldByIdAndProject(fieldId uint, projectId uint) error{
	result := service.database.Delete(&models.Field{}, "id = ? AND project_id = ?" , fieldId, projectId )
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("can't find a corresponding field")
	}

	return nil
}