package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/models"
	"trackr/src/services"
)

const (
	apiKeyLength = 64
)

func addProjectRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	projects, err := serviceProvider.GetProjectService().GetProjectsByUser(*user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to fetch current project count."})
		return
	}

	if len(projects)+1 > int(user.MaxProjects) {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "You cannot create a new project as you have reached your project limit."})
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
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :id parameter provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProjectByIdAndUser(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get projects."})
		return
	}

	c.JSON(http.StatusOK, responses.Project{
		Name:        project.Name,
		Description: project.Description,
		APIKey:      project.APIKey,
		CreatedAt:   project.CreatedAt,
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

	projectId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :id parameter provided."})
		return
	}

	err = serviceProvider.GetProjectService().DeleteProjectByIdAndUser(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete project."})
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
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to find corresponding project."})
		return
	}

	if json.Name != "" {
		project.Name = json.Name
	}

	if json.Description != "" {
		project.Description = json.Name
	}

	if json.ResetAPIKey {
		apiKey, err := generateAPIKey()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to generate new API key."})
			return
		}

		project.APIKey = apiKey
	}

	err = serviceProvider.GetProjectService().UpdateProject(*project)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update project."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func initProjectsController(router *gin.Engine, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	routerGroup := router.Group("/api/projects")
	routerGroup.Use(sessionMiddleware)

	routerGroup.POST("/", addProjectRoute)
	routerGroup.GET("/:id", getProjectRoute)
	routerGroup.GET("/", getProjectsRoute)
	routerGroup.PUT("/:id", updateProjectRoute)
	routerGroup.DELETE("/:id", deleteProjectRoute)
}
