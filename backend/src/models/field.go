package models

import (
	"gorm.io/gorm"
)

type Field struct {
	gorm.Model
	Name string

	ProjectID uint
	Project   Project `gorm:"constraint:OnDelete:CASCADE;"`
}
