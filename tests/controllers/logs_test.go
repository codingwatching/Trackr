package controllers_test

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/tests"
)

func TestGetUserLogsRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "GET", "/api/logs/"

	//
	// Test not logged in path.
	//

	response, _ := json.Marshal(responses.Error{
		Error: "Not authorized to access this resource.",
	})

	httpRecorder := httptest.NewRecorder()
	httpRequest, _ := http.NewRequest(method, path, nil)
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusForbidden, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test successful path.
	//

	response, _ = json.Marshal(responses.LogList{
		Logs: []responses.Log{
			{
				Message:   "Log",
				CreatedAt: suite.Time,
			},
		},
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}

func TestGetProjectLogsRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "GET", "/api/logs/"

	//
	// Test not logged in path.
	//

	response, _ := json.Marshal(responses.Error{
		Error: "Not authorized to access this resource.",
	})

	httpRecorder := httptest.NewRecorder()
	httpRequest, _ := http.NewRequest(method, path+"1", nil)
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusForbidden, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test successful path.
	//

	response, _ = json.Marshal(responses.LogList{
		Logs: []responses.Log{
			{
				Message:   "Log",
				CreatedAt: suite.Time,
			},
		},
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}

func TestAddLogRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "POST", "/api/logs/"

	//
	// Test not logged in path.
	//

	response, _ := json.Marshal(responses.Error{
		Error: "Not authorized to access this resource.",
	})

	httpRecorder := httptest.NewRecorder()
	httpRequest, _ := http.NewRequest(method, path, nil)
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusForbidden, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test invalid project id paramater.
	//
	request, _ := json.Marshal(requests.AddLog{
		ProjectID: 0,
		UserID:    suite.User.ID,
		Message:   "message",
	})

	response, _ = json.Marshal(responses.Error{
		Error: "Cannot find project.",
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test successful path.
	//
	request, _ = json.Marshal(requests.AddLog{
		ProjectID: suite.Project.ID,
		UserID:    suite.User.ID,
		Message:   "message",
	})
	response, _ = json.Marshal(responses.NewField{
		ID: uint(2),
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}
