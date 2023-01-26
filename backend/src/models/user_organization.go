package models

import (
	"gorm.io/gorm"
)

type UserOrganization struct {
	gorm.Model
	Role string

	UserID uint
	User   User

	OrganizationID uint
	Organization   Organization
}
