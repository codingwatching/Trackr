package models

import (
	"database/sql"
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	Name           string
	Description    string
	APIKey         string        `gorm:"uniqueIndex"`
	Users          []User        `gorm:"many2many:user_project;"`
	OrganizationID sql.NullInt64 // uint
}
