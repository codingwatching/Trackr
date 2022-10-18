package db_test

import (
	"github.com/stretchr/testify/assert"
	"testing"

	"trackr/src/models"
	"trackr/tests"
)

func TestGetUserLogs(t *testing.T) {
	suite := tests.Startup()

	logs, err := suite.Service.GetLogsService().GetUserLogs(suite.User)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(logs))
	assert.Equal(t, suite.Log.ID, logs[0].ID)

	logs, err = suite.Service.GetLogsService().GetUserLogs(models.User{})
	assert.Nil(t, err)
	assert.Equal(t, 0, len(logs))
}

func TestGetProjectLogs(t *testing.T) {
	suite := tests.Startup()

	logs, err := suite.Service.GetLogsService().GetProjectLogs(suite.Project, suite.User)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(logs))
	assert.Equal(t, suite.Log.ID, logs[0].ID)

	logs, err = suite.Service.GetLogsService().GetProjectLogs(models.Project{}, models.User{})
	assert.Nil(t, err)
	assert.Equal(t, 0, len(logs))
}

func TestAddLogs(t *testing.T) {
	suite := tests.Startup()

	newLog := suite.Log
	newLog.ID = 2
	newLog.Message = "Message"
	newLog.CreatedAt = suite.Time
	newLog.Project = suite.Project
	newLog.ProjectID = suite.Project.ID
	newLog.User = suite.User
	newLog.UserID = suite.User.ID

	logId, err := suite.Service.GetLogsService().AddLog(newLog)
	assert.Nil(t, err)
	assert.Equal(t, 2, logId)

	logs, err := suite.Service.GetLogsService().GetUserLogs(suite.User)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(logs))
}
