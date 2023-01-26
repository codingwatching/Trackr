package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	Name        string
	Description string
	APIKey      string `gorm:"uniqueIndex"`

	UserOrganizations []*UserOrganization `gorm:"many2many:user_organizations;"`
	Projects          []Project           `gorm:"foreignKey:OrganizationID"`
}
