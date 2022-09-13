package models

import (
	"time"
)

type Session struct {
	ID        string `gorm:"primarykey"`
	UserAgent string
	CreatedAt time.Time
	ExpiresAt time.Time

	UserID uint
	User   User
}
