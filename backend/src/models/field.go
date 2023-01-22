package models

import (
	"gorm.io/gorm"
	"time"
)

type Field struct {
	gorm.Model
	Name      string
	UpdatedAt time.Time
	CreatedAt time.Time

	ProjectID uint
	Project   Project `gorm:"constraint:OnDelete:CASCADE;"`
}
