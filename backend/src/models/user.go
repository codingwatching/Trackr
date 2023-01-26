package models

import (
	"fmt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email      string `gorm:"uniqueIndex"`
	Password   string
	FirstName  string
	LastName   string
	IsVerified bool

	MaxValues        int64
	MaxValueInterval int64

	UserOrganizations []*UserOrganization `gorm:"many2many:user_organizations;"`
	Projects          []*Project          `gorm:"many2many:user_projects;"`
}

func (user *User) BeforeSave(db *gorm.DB) error {
	for _, project := range user.Projects {
		var organizationCount int64
		db.Table("user_organizations").Where("user_id = ? and organization_id = ?", user.ID, project.OrganizationID).Count(&organizationCount)
		if organizationCount == 0 {
			return fmt.Errorf("user must be a member of the organization that the project belongs to")
		}
	}
	return nil
}
