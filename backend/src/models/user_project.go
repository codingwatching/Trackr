package models

import (
	"database/sql"
	"time"
)

type UserProject struct {
	Role   string
	APIKey string `gorm:"uniqueIndex"`

	UserID uint `gorm:"primary_key"`
	User   User

	ProjectID uint `gorm:"primary_key"`
	Project   Project

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt sql.NullTime `gorm:"index"`
}
