package db

import (
	"fmt"
	"gorm.io/gorm"

	"trackr/src/models"
)

type FieldService struct {
	DB *gorm.DB
}

func (service *FieldService) GetFields(project models.Project, user models.User) ([]models.Field, error) {
	var fields []models.Field
	if result := service.DB.Model(&models.Field{}).Joins(
		"LEFT JOIN projects ON fields.project_id = projects.id",
	).Find(
		&fields, "fields.project_id = ? AND projects.user_id = ?", project.ID, user.ID,
	); result.Error != nil {
		return nil, result.Error
	}

	return fields, nil
}

func (service *FieldService) GetNumberOfProjectsByOrganization(organization models.Organization, user models.User) (int64, error) {
	var count int64

	if count := service.DB.Model(&organization).Association("Projects").Count(); count < 0 {
		return 0, fmt.Errorf("an error occurred when retrieving the number of associated projects")
	}

	return count, nil
}

func (service *FieldService) GetNumberOfFieldsByProject(project models.Project, user models.User) (int64, error) {
	var count int64

	if result := service.DB.Model(&models.Field{}).Joins(
		"LEFT JOIN projects ON fields.project_id = projects.id",
	).Where("fields.project_id = ? AND projects.user_id = ?", project.ID, user.ID).Count(&count); result.Error != nil {
		return 0, result.Error
	}

	return count, nil
}

func (service *FieldService) GetNumberOfFieldsByUser(user models.User) (int64, error) {
	var count int64

	if result := service.DB.Model(&models.Field{}).Joins(
		"LEFT JOIN projects ON fields.project_id = projects.id",
	).Where("projects.user_id = ?", user.ID).Count(&count); result.Error != nil {
		return 0, result.Error
	}

	return count, nil
}

func (service *FieldService) GetField(id uint, user models.User) (*models.Field, error) {
	var field models.Field
	if result := service.DB.Model(&models.Field{}).Joins(
		"LEFT JOIN projects ON fields.project_id = projects.id",
	).First(
		&field, "fields.id = ? AND projects.user_id = ?", id, user.ID,
	); result.Error != nil {
		return nil, result.Error
	}

	return &field, nil
}

func (service *FieldService) AddField(field models.Field) (uint, error) {
	if result := service.DB.Create(&field); result.Error != nil {
		return 0, result.Error
	}

	return field.ID, nil
}

func (service *FieldService) UpdateField(field models.Field) error {
	if result := service.DB.Save(&field); result.Error != nil {
		return result.Error
	}
	return nil
}

func (service *FieldService) DeleteField(field models.Field) error {
	result := service.DB.Delete(field)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
