package models

import (
	"gorm.io/gorm"
)

type Organization struct {
	gorm.Model
	Name        string
	Description string
	APIKey      string `gorm:"uniqueIndex"`

	Users    []User    `gorm:"many2many:user_organization;"`
	Projects []Project `gorm:"foreignKey:OrganizationID"`
}
