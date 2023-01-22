package models

import (
	"gorm.io/gorm"
	"time"
)

type Log struct {
	gorm.Model
	Message   string
	CreatedAt time.Time

	UserID uint
	User   User `gorm:"constraint:OnDelete:CASCADE;"`

	ProjectID *uint
	Project   Project `gorm:"constraint:OnDelete:SET NULL;"`
}
