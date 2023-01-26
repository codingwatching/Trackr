package db

import (
	"fmt"
	"gorm.io/gorm"
	"trackr/src/models"
)

type OrganizationService struct {
	DB *gorm.DB
}

func (service *OrganizationService) GetOrganizations(user models.User) ([]models.Organization, error) {
	var organizations []models.Organization

	if result := service.DB.
		Order("created_at DESC").
		Find(&organizations, "user_id = ?", user.ID); result.Error != nil {
		return nil, result.Error
	}

	return organizations, nil
}

func (service *OrganizationService) GetOrganization(id uint, user models.User) (*models.Organization, error) {
	var organization models.Organization

	if result := service.DB.
		Model(&models.Organization{}).
		Joins("INNER JOIN user_organizations ON user_organizations.organization_id = organizations.id AND user_organizations.user_id = ?", user.ID).
		First(&organization); result.Error != nil {
		return nil, result.Error
	}

	return &organization, nil
}

func (service *OrganizationService) GetOrganizationByAPIKey(apiKey string) (*models.Organization, error) {
	var organization models.Organization

	if result := service.DB.
		Preload("Users").
		First(&organization, "api_key = ?", apiKey); result.Error != nil {
		return nil, result.Error
	}

	return &organization, nil
}

func (service *OrganizationService) AddOrganization(organization models.Organization, userOrganization models.UserOrganization) (uint, error) {
	if result := service.DB.Create(&organization); result.Error != nil {
		return 0, result.Error
	}

	if result := service.DB.Create(&userOrganization); result.Error != nil {
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
	if result := service.DB.
		Model(&models.Organization{}).
		Joins("INNER JOIN user_organizations ON user_organizations.organization_id = ? "+
			"AND user_organization.user_id = ? AND user_organizations.role = ?", id, user.ID, "organization_owner").
		Delete(&models.Organization{}); result.Error != nil {
		return result.Error
	} else if result.RowsAffected < 1 {
		return fmt.Errorf("no rows affected")
	}

	return nil
}
