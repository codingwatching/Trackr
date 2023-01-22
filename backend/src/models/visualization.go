package models

import (
	"gorm.io/gorm"
)

type Visualization struct {
	gorm.Model
	Metadata string

	FieldID uint
	Field   Field `gorm:"constraint:OnDelete:CASCADE;"`
}
