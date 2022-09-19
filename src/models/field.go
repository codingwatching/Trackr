package models

import "time"

type Field struct {
	ID        uint `gorm:"primarykey"`
	Name      string
	Type      int
	UpdatedAt time.Time
	CreatedAt time.Time

	ProjectID uint
	Project   Project `gorm:"constraint:OnDelete:CASCADE;"`
}
