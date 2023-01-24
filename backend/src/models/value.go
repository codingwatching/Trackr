package models

import (
	"gorm.io/gorm"
	"time"
)

type Value struct {
	gorm.Model
	Value     string
	CreatedAt time.Time `gorm:"index"`

	FieldID uint
	Field   Field `gorm:"constraint:OnDelete:CASCADE;"`
}
