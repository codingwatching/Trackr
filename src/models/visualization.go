package models

import "time"

type Visualization struct {
	ID        uint `gorm:"primarykey"`
	Metadata  string
	UpdatedAt time.Time
	CreatedAt time.Time

	ProjectID uint
	Project   Project `gorm:"constraint:OnDelete:CASCADE;"`
}
