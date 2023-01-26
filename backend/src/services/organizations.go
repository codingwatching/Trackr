package services

import (
	"trackr/src/models"
)

type OrganizationService interface {
	GetOrganizations(user models.User) ([]models.Organization, error)
	GetOrganization(id uint, user models.User) (*models.Organization, error)
	GetOrganizationByAPIKey(apiKey string) (*models.Organization, error)
	AddOrganization(organization models.Organization, userOrganization models.UserOrganization) (uint, error)
	UpdateOrganization(organization models.Organization) error
	DeleteOrganization(id uint, user models.User) error
}
