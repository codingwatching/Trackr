package db_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"trackr/src/models"
	"trackr/tests"
)

func TestGetFields(t *testing.T) {
	suite := tests.Startup()

	fields, err := suite.Service.GetFieldService().GetFields(suite.Project, suite.User)
	assert.Nil(t, err)
	assert.Equal(t, len(fields), 1)
	assert.Equal(t, fields[0].ID, suite.Field.ID)

	fields, err = suite.Service.GetFieldService().GetFields(models.Project{}, models.User{})
	assert.Nil(t, err)
	assert.Equal(t, len(fields), 0)
}

func TestGetField(t *testing.T) {
	suite := tests.Startup()

	field, err := suite.Service.GetFieldService().GetField(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, field)
	assert.Equal(t, field.ID, suite.Field.ID)

	field, err = suite.Service.GetFieldService().GetField(2, suite.User)
	assert.NotNil(t, err)
	assert.Nil(t, field)

	field, err = suite.Service.GetFieldService().GetField(1, models.User{})
	assert.NotNil(t, err)
	assert.Nil(t, field)
}

func TestAddField(t *testing.T) {
	suite := tests.Startup()

	newField := suite.Field
	newField.Name = "Field2"
	newField.CreatedAt = suite.Time
	newField.UpdatedAt = suite.Time
	newField.Project = suite.Project

	err := suite.Service.GetFieldService().AddField(newField)
	assert.Nil(t, err)

	fields, err := suite.Service.GetFieldService().GetFields(suite.Project, suite.User)
	assert.Nil(t, err)
	assert.Equal(t, len(fields), 2)
	assert.Equal(t, fields[1].ID, 2)
	assert.Equal(t, fields[1].ProjectID, suite.Project.ID)
}

func TestUpdateField(t *testing.T) {
	suite := tests.Startup()

	newField := suite.Field
	newField.Name = "NewField"

	err := suite.Service.GetFieldService().UpdateField(newField)
	assert.Nil(t, err)

	fields, err := suite.Service.GetFieldService().GetFields(suite.Project, suite.User)
	assert.Nil(t, err)
	assert.Equal(t, len(fields), 1)
	assert.Equal(t, fields[0].ID, suite.Field.ID)
	assert.Equal(t, fields[0].Name, newField.Name)
}

func TestDeleteField(t *testing.T) {
	suite := tests.Startup()

	err := suite.Service.GetFieldService().DeleteField(2, suite.User)
	assert.NotNil(t, err)

	err = suite.Service.GetFieldService().DeleteField(suite.Field.ID, models.User{})
	assert.NotNil(t, err)

	err = suite.Service.GetFieldService().DeleteField(suite.Field.ID, suite.User)
	assert.Nil(t, err)

	fields, err := suite.Service.GetFieldService().GetFields(suite.Project, suite.User)
	assert.Nil(t, err)
	assert.Equal(t, len(fields), 0)
}
