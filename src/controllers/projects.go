package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

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
	}

	projectId, err := serviceProvider.GetProjectService().AddProject(project)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a new project."})
		return
	}

	c.JSON(http.StatusOK, responses.NewProject{
		ID: projectId,
	})
}

func getProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :projectId parameter provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProject(uint(projectId), *user)
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
	})
}

func getProjectsRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projects, err := serviceProvider.GetProjectService().GetProjects(*user)
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
		}
	}

	c.JSON(http.StatusOK, responses.ProjectList{Projects: projectList})
}

func deleteProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :projectId parameter provided."})
		return
	}

	err = serviceProvider.GetProjectService().DeleteProject(uint(projectId), *user)
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

	project, err := serviceProvider.GetProjectService().GetProject(json.ID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find project."})
		return
	}

	if json.Name == "" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "The project's name cannot be empty."})
		return
	}

	project.Name = json.Name
	project.Description = json.Description

	if json.ResetAPIKey {
		apiKey, err := generateAPIKey()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to generate new API key."})
			return
		}

		project.APIKey = apiKey
	}

	project.UpdatedAt = time.Now()

	err = serviceProvider.GetProjectService().UpdateProject(*project)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update project."})
		return
	}

	c.JSON(http.StatusOK, responses.UpdateProject{
		APIKey: project.APIKey,
	})
}

func initProjectsController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	projectsRouterGroup := routerGroup.Group("/projects")
	projectsRouterGroup.Use(sessionMiddleware)

	projectsRouterGroup.POST("/", addProjectRoute)
	projectsRouterGroup.GET("/:projectId", getProjectRoute)
	projectsRouterGroup.GET("/", getProjectsRoute)
	projectsRouterGroup.PUT("/", updateProjectRoute)
	projectsRouterGroup.DELETE("/:projectId", deleteProjectRoute)
}
