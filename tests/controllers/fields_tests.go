package controllers_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/tests"
)

func TestAddFieldRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "POST", "/api/fields/"

	request, _ := json.Marshal(requests.AddField{
		ProjectID: 1,
		Name:      "Field2",
	})

	//
	// Test not logged in path.
	//
	response, _ := json.Marshal(responses.Error{
		Error: "Not authorized to access this resource.",
	})

	httpRecorder := httptest.NewRecorder()
	httpRequest, _ := http.NewRequest(method, path, bytes.NewReader(request))
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusForbidden, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	field, err := suite.Service.GetFieldService().GetField(2, suite.User)
	assert.NotNil(t, err)
	assert.Nil(t, field)

	//
	// Test successful path.
	//
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	field, err = suite.Service.GetFieldService().GetField(2, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, field)
	assert.Equal(t, uint(2), field.ID)

	//
	// Test missing projectId paramater.
	//
	request, _ := json.Marshal(requests.AddField{
		ProjectID: "",
		Name:      "Field2",
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
	// Test missing name paramater.
	//
	request, _ := json.Marshal(requests.AddField{
		ProjectID: 1,
		Name:      "",
	})

	response, _ = json.Marshal(responses.Error{
		Error: "The name of a field cannot be empty.",
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}

func TestGetFieldsRoute(t, testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "GET", "/api/fields/"

}
