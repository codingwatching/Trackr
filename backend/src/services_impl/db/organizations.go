package db

import (
	"fmt"
	"trackr/src/models"

	"gorm.io/gorm"
)

type OrganizationService struct {
	DB *gorm.DB
}

func (service *OrganizationService) GetOrganizations(user models.User) ([]models.Organization, error) {
	var organizations []models.Organization
	if result := service.DB.Order("created_at DESC").Find(&organizations, "user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return organizations, nil
}

func (service *OrganizationService) GetOrganization(id uint, user models.User) (*models.Organization, error) {
	var organization models.Organization
	if result := service.DB.First(&organization, "id = ? AND user_id = ?", id, user.ID); result.Error != nil {
		return nil, result.Error
	}

	return &organization, nil
}

func (service *OrganizationService) GetOrganizationByAPIKey(apiKey string) (*models.Organization, error) {
	var organization models.Organization
	if result := service.DB.Preload("User").First(&organization, "api_key = ?", apiKey); result.Error != nil {
		return nil, result.Error
	}

	return &organization, nil
}

func (service *OrganizationService) AddOrganization(organization models.Organization) (uint, error) {
	if result := service.DB.Create(&organization); result.Error != nil {
		return 0, result.Error
	}

	return organization.ID, nil
}

func (service *OrganizationService) UpdateOrganization(organization models.Organization) error {
	if result := service.DB.Save(&organization); result.Error != nil {
		return result.Error
	}

	return nil
}

func (service *OrganizationService) DeleteOrganization(id uint, user models.User) error {
	result := service.DB.Delete(&models.Organization{}, "id = ? AND user_id = ?", id, user.ID)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
