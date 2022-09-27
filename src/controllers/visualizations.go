package controllers

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/services"
)


func addVisualization(c *gin.Context) {
	user := getLoggedInUser(c)

	var json requests.Visualization
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :projectId parameter provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProjectByIdAndUser(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Cannot find project."})
		return
	}

	if json.Name == "" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "The name of a field cannot be empty."})
		return
	}

	createdAt := time.Now()

	visualization := models.Visualization{
		ID:       uint `gorm:"primarykey"`,
		Metadata:  "",
		UpdatedAt: createdAt,
		CreatedAt: createdAt,
		Project: *project,
	}

	if err := serviceProvider.GetVisualizationService().AddVisualization(visualization); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a new visualization."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func getVisualizations(c *gin.Context) {
	user := getLoggedInUser(c)

	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :projectId parameter provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProjectByIdAndUser(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find project."})
		return
	}

	visualizations, err := serviceProvider.GetVisulizationService().GetVisualizations(*project, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to get visualizations."})
		return
	}

	visualizationList := make([]responses.Visualization, len(visualizations))
	for index, visualization := range visualizations {
		visualizationList[index] = responses.Visualization {
			Metadata:  visualization.Metadata,
			UpdatedAt: visualization.createdAt,
			CreatedAt: visualization.createdAt,
		}
	}

	c.JSON(http.StatusOK, responses.VisualizationList{Visualizations: visualizationList})
}

func updateVisualization(c *gin.Context) {
	user := getLoggedInUser(c)

	visulizationId, err := strconv.Atoi(c.Param("visulizationId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :visulizationId parameter provided."})
		return
	}

	var json requests.Visualization
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	visualization, err := serviceProvider.GetVisualizationService().GetField(visulizationId, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find visualization."})
		return
	}

	visualization.Metadata = json.Metadata
	visualization.UpdatedAt = time.Now()

	if err := serviceProvider.GetVisualizationService().UpdateVisualization(*visualization); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update visualization."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func deleteVisualization(c *gin.Context) {
	user := getLoggedInUser(c)

	visualizationId, err := strconv.Atoi(c.Param("visualizationId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :visualizationId parameter provided."})
		return
	}

	err = serviceProvider.GetVisualizationService().DeleteVisualization(uint(visualizationId), *user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete visulization."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func initVisualizationsController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	usersRouterGroup := routerGroup.Group("/visualizations")
	usersRouterGroup.Use(sessionMiddleware)

	usersRouterGroup.GET("/:projectId", getVisualizations)
	usersRouterGroup.POST("/:projectId", addVisualization)
	usersRouterGroup.PUT("/:visualizationId", updateUserRoute)
	usersRouterGroup.DELETE("/:visualizationId", deleteUserRoute)
}
