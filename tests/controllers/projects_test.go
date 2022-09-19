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

func TestAddProjectRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "POST", "/api/projects/"

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

	project, err := suite.Service.GetProjectService().GetProjectByIdAndUser(2, suite.User)
	assert.NotNil(t, err)
	assert.Nil(t, project)

	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(2, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, uint(2), project.ID)

	//
	// Test project limit reached path.
	//

	response, _ = json.Marshal(responses.Error{
		Error: "You cannot create a new project as you have reached your project limit.",
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}

func TestGetProjectsRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "GET", "/api/projects/"

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

	newProject := suite.Project
	newProject.ID = 2
	newProject.APIKey = "APIKey2"
	assert.Nil(t, suite.Service.GetProjectService().AddProject(newProject))

	response, _ = json.Marshal(responses.ProjectList{
		Projects: []responses.Project{
			{
				ID:          suite.Project.ID,
				Name:        suite.Project.Name,
				Description: suite.Project.Description,
				APIKey:      suite.Project.APIKey,
				CreatedAt:   suite.Project.CreatedAt,
				ShareURL:    suite.Project.ShareURL,
			},
			{
				ID:          newProject.ID,
				Name:        newProject.Name,
				Description: newProject.Description,
				APIKey:      newProject.APIKey,
				CreatedAt:   newProject.CreatedAt,
				ShareURL:    newProject.ShareURL,
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

func TestGetProjectRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "GET", "/api/projects/"

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

	response, _ = json.Marshal(responses.Project{
		ID:          suite.Project.ID,
		Name:        suite.Project.Name,
		Description: suite.Project.Description,
		APIKey:      suite.Project.APIKey,
		CreatedAt:   suite.Project.CreatedAt,
		ShareURL:    suite.Project.ShareURL,
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"1", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())
}

func TestDeleteProjectRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "DELETE", "/api/projects/"

	//
	// Test not logged in path.
	//

	response, _ := json.Marshal(responses.Error{
		Error: "Not authorized to access this resource.",
	})
	httpRecorder := httptest.NewRecorder()
	httpRequest, _ := http.NewRequest(method, path+"0", nil)
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
	// Test non-existant project id path.
	//

	response, _ = json.Marshal(responses.Error{
		Error: "Failed to delete project.",
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

	project, err := suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, uint(1), project.ID)
	assert.Equal(t, suite.User.ID, project.UserID)

	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path+"1", nil)
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.NotNil(t, err)
	assert.Nil(t, project)
}

func TestUpdateProjectRoute(t *testing.T) {
	suite := tests.StartupWithRouter()
	method, path := "PUT", "/api/projects/"

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

	request, _ := json.Marshal(requests.UpdateProject{
		ID: 0,
	})
	response, _ = json.Marshal(responses.Error{
		Error: "Failed to find project.",
	})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusBadRequest, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	//
	// Test no modification path.
	//

	request, _ = json.Marshal(requests.UpdateProject{
		ID: 1,
	})
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err := suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, suite.Project.Name, project.Name)
	assert.Equal(t, suite.Project.Description, project.Description)
	assert.Equal(t, suite.Project.APIKey, project.APIKey)
	assert.Equal(t, suite.Project.ShareURL, project.ShareURL)

	//
	// Test updating name path.
	//

	request, _ = json.Marshal(requests.UpdateProject{
		ID:   1,
		Name: "New Project Name",
	})
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, "New Project Name", project.Name)
	assert.Equal(t, suite.Project.Description, project.Description)
	assert.Equal(t, suite.Project.APIKey, project.APIKey)
	assert.Equal(t, suite.Project.ShareURL, project.ShareURL)

	//
	// Test updating description path.
	//

	request, _ = json.Marshal(requests.UpdateProject{
		ID:          1,
		Description: "New Description Name",
	})
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, "New Project Name", project.Name)
	assert.Equal(t, "New Description Name", project.Description)
	assert.Equal(t, suite.Project.APIKey, project.APIKey)
	assert.Equal(t, suite.Project.ShareURL, project.ShareURL)

	//
	// Test resetting api key path.
	//

	request, _ = json.Marshal(requests.UpdateProject{
		ID:          1,
		ResetAPIKey: true,
	})
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, "New Project Name", project.Name)
	assert.Equal(t, "New Description Name", project.Description)
	assert.NotEqual(t, suite.Project.APIKey, project.APIKey)
	assert.Equal(t, suite.Project.ShareURL, project.ShareURL)

	previousAPIKey := project.APIKey

	//
	// Test enabling sharing path.
	//

	request, _ = json.Marshal(requests.UpdateProject{
		ID:    1,
		Share: true,
	})
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, "New Project Name", project.Name)
	assert.Equal(t, "New Description Name", project.Description)
	assert.Equal(t, previousAPIKey, project.APIKey)
	assert.NotEqual(t, suite.Project.ShareURL, project.ShareURL)

	previousShareURL := project.ShareURL

	//
	// Test enabling sharing again path.
	//

	request, _ = json.Marshal(requests.UpdateProject{
		ID:    1,
		Share: true,
	})
	response, _ = json.Marshal(responses.Empty{})
	httpRecorder = httptest.NewRecorder()
	httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
	httpRequest.Header.Add("Cookie", "Session=SessionID")
	suite.Router.ServeHTTP(httpRecorder, httpRequest)

	assert.Equal(t, http.StatusOK, httpRecorder.Code)
	assert.Equal(t, response, httpRecorder.Body.Bytes())

	project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, "New Project Name", project.Name)
	assert.Equal(t, "New Description Name", project.Description)
	assert.Equal(t, previousAPIKey, project.APIKey)
	assert.Equal(t, previousShareURL, project.ShareURL)

	//
	// Test disabling sharing twice path.
	//

	for i := 0; i < 2; i++ {
		request, _ = json.Marshal(requests.UpdateProject{
			ID:    1,
			Share: false,
		})
		response, _ = json.Marshal(responses.Empty{})
		httpRecorder = httptest.NewRecorder()
		httpRequest, _ = http.NewRequest(method, path, bytes.NewReader(request))
		httpRequest.Header.Add("Cookie", "Session=SessionID")
		suite.Router.ServeHTTP(httpRecorder, httpRequest)

		assert.Equal(t, http.StatusOK, httpRecorder.Code)
		assert.Equal(t, response, httpRecorder.Body.Bytes())

		project, err = suite.Service.GetProjectService().GetProjectByIdAndUser(1, suite.User)
		assert.Nil(t, err)
		assert.NotNil(t, project)
		assert.Equal(t, "New Project Name", project.Name)
		assert.Equal(t, "New Description Name", project.Description)
		assert.Equal(t, previousAPIKey, project.APIKey)
		assert.Equal(t, suite.Project.ShareURL, project.ShareURL)
	}
}
