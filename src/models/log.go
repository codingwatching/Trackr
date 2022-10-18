package models

import "time"

type Log struct {
	ID        uint `gorm:"primarykey"`
	Message   string
	CreatedAt time.Time

	ProjectID uint
	Project   Project

	UserID uint
	User   User
}
