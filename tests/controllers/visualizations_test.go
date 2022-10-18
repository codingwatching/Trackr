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

func TestAddVisualizationRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method := "POST"
	path := "/api/visualizations/0"

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

	visualization, err := suite.Service.GetVisualizationService().GetVisualization(2, suite.User)
	assert.NotNil(t, err)
	assert.Nil(t, visualization)

	//
	// Test invalid project id paramater.
	//
	response, _ = json.Marshal(responses.Error{
		Error: "Cannot find project.",
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test successful path.
	//

	path = "/api/visualizations/1"
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	var body responses.NewVisualization
	json.Unmarshal(httpRecorder.Body.Bytes(), &body)

	visualization, err = suite.Service.GetVisualizationService().GetVisualization(body.ID, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, visualization)
	assert.Equal(t, uint(1), visualization.ProjectID)
}

func TestGetVisualizationsRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "GET", "/api/visualizations/"

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
	// Test non-existant project id path.
	//

	response, _ = json.Marshal(responses.Error{
		Error: "Failed to find project.",
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"0", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test successful path.
	//

	response, _ = json.Marshal(responses.VisualizationList{
		Visualizations: []responses.Visualization{
			{
				Metadata:  "Metadata",
				UpdatedAt: suite.Time,
				CreatedAt: suite.Time,
			},
		},
	})

	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"1", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}

func TestUpdateVisualizationsRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "PUT", "/api/visualizations/"

	request, _ := json.Marshal(requests.Visualization{
		Metadata: "MetaData",
	})

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
	// Test invalid request parameters path.
	//
	response, _ = json.Marshal(responses.Error{
		Error: "Invalid request parameters provided.",
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test invalid project id path.
	//
	response, _ = json.Marshal(responses.Error{
		Error: "Failed to find visualization.",
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"1", bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test updating metadata path.
	//
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	visualization, err := suite.Service.GetVisualizationService().GetVisualization(suite.Visualization.ID, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, visualization)
	assert.Equal(t, "MetaData", visualization.Metadata)
}

func TestDeleteVisualizationRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "DELETE", "/api/visualizations/"

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
	// Test invalid id parameter path.
	//
	response, _ = json.Marshal(responses.Error{
		Error: "Invalid :id parameter provided.",
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"invalid", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test non-existant field id path.
	//
	response, _ = json.Marshal(responses.Error{
		Error: "Failed to delete field.",
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"0", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusInternalServerError, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test successful path.
	//
	visualization, err := suite.Service.GetVisualizationService().GetVisualization(suite.Visualization.ID, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, visualization)
	assert.Equal(t, uint(1), visualization.ID)
	assert.Equal(t, suite.Project.ID, visualization.ProjectID)

	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"1", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	logs, err := suite.Service.GetLogsService().GetUserLogs(suite.Project, suite.User)
	assert.Nil(t, err)
	assert.Equal(t, 2, len(logs))
}
