package models

import "time"

type Log struct {
	ID        uint `gorm:"primarykey"`
	Message   string
	CreatedAt time.Time

	UserID uint
	User   User

	ProjectID *uint
	Project   Project `gorm:"constraint:OnDelete:SET NULL;"`
}
