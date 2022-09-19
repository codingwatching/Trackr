package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"

	"trackr/src/common"
	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/models"
	"trackr/src/services"
)

const (
	apiKeyLength   = 64
	shareURLLength = 32
)

func addProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projects, err := serviceProvider.GetProjectService().GetProjectsByUser(*user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to fetch current project count."})
		return
	}

	if len(projects) >= int(user.MaxProjects) {
		c.JSON(http.StatusBadRequest, responses.Error{
			Error: "You cannot create a new project as you have reached your project limit.",
		})
		return
	}

	apiKey, err := generateAPIKey()
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to generate API key."})
		return
	}

	project := models.Project{
		Name:        "Untitled Project",
		Description: "",
		APIKey:      apiKey,
		User:        *user,
		ShareURL:    nil,
	}

	if err := serviceProvider.GetProjectService().AddProject(project); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a new project."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func getProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projectId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :id parameter provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProjectByIdAndUser(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find project."})
		return
	}

	c.JSON(http.StatusOK, responses.Project{
		ID:          project.ID,
		Name:        project.Name,
		Description: project.Description,
		APIKey:      project.APIKey,
		CreatedAt:   project.CreatedAt,
		ShareURL:    project.ShareURL,
	})
}

func getProjectsRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projects, err := serviceProvider.GetProjectService().GetProjectsByUser(*user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get projects."})
		return
	}

	projectList := make([]responses.Project, len(projects))
	for index, project := range projects {
		projectList[index] = responses.Project{
			ID:          project.ID,
			Name:        project.Name,
			Description: project.Description,
			APIKey:      project.APIKey,
			CreatedAt:   project.CreatedAt,
			ShareURL:    project.ShareURL,
		}
	}

	c.JSON(http.StatusOK, responses.ProjectList{Projects: projectList})
}

func deleteProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projectId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :id parameter provided."})
		return
	}

	err = serviceProvider.GetProjectService().DeleteProjectByIdAndUser(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to delete project."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func updateProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	var json requests.UpdateProject
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProjectByIdAndUser(json.ID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find project."})
		return
	}

	wasModified := false

	if json.Name != "" {
		project.Name = json.Name
		wasModified = true
	}

	if json.Description != "" {
		project.Description = json.Description
		wasModified = true
	}

	if json.ResetAPIKey {
		apiKey, err := generateAPIKey()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to generate new API key."})
			return
		}

		project.APIKey = apiKey
		wasModified = true
	}

	if json.Share && project.ShareURL == nil {
		shareURL, err := common.RandomString(shareURLLength)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to generate share URL."})
			return
		}

		project.ShareURL = &shareURL
		wasModified = true
	} else if !json.Share && project.ShareURL != nil {
		project.ShareURL = nil
		wasModified = true
	}

	if wasModified {
		project.UpdatedAt = time.Now()
	}

	err = serviceProvider.GetProjectService().UpdateProject(*project)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update project."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func initProjectsController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	projectsRouterGroup := routerGroup.Group("/projects")
	projectsRouterGroup.Use(sessionMiddleware)

	projectsRouterGroup.POST("/", addProjectRoute)
	projectsRouterGroup.GET("/:id", getProjectRoute)
	projectsRouterGroup.GET("/", getProjectsRoute)
	projectsRouterGroup.PUT("/", updateProjectRoute)
	projectsRouterGroup.DELETE("/:id", deleteProjectRoute)
}
