package controllers

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/models"
	"trackr/src/services"
)

func addVisualizationRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	if os.Getenv("DISABLE_SIGN_UP") == "true" {
		c.JSON(http.StatusForbidden, responses.Error{Error: "Cannot make any additions or edits while in demo mode."})
		return
	}

	var json requests.AddVisualization
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	if json.Metadata == "" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "The metadata parameter cannot be empty."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetField(json.FieldID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find field."})
		return
	}

	createdAt := time.Now()
	visualization := models.Visualization{
		Metadata:  json.Metadata,
		UpdatedAt: createdAt,
		CreatedAt: createdAt,
		Field:     *field,
	}

	visualizationId, err := serviceProvider.GetVisualizationService().AddVisualization(visualization)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a new visualization."})
		return
	}

	err = serviceProvider.GetLogService().AddLog("Added a new visualization.", *user, &field.ProjectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a log entry."})
		return
	}

	c.JSON(http.StatusOK, responses.NewVisualization{
		ID: visualizationId,
	})
}

func getVisualizationsRoute(c *gin.Context) {
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

	visualizations, err := serviceProvider.GetVisualizationService().GetVisualizations(*project, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to get visualizations."})
		return
	}

	visualizationList := make([]responses.Visualization, len(visualizations))
	for index, visualization := range visualizations {
		visualizationList[index] = responses.Visualization{
			ID:      visualization.ID,
			FieldID: visualization.Field.ID,

			Metadata:  visualization.Metadata,
			UpdatedAt: visualization.UpdatedAt,
			CreatedAt: visualization.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, responses.VisualizationList{Visualizations: visualizationList})
}

func updateVisualizationRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	if os.Getenv("DISABLE_SIGN_UP") == "true" {
		c.JSON(http.StatusForbidden, responses.Error{Error: "Cannot make any additions or edits while in demo mode."})
		return
	}

	var json requests.UpdateVisualization
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	if json.Metadata == "" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "The metadata parameter cannot be empty."})
		return
	}

	visualization, err := serviceProvider.GetVisualizationService().GetVisualization(json.ID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find visualization."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetField(json.FieldID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find corresponding field."})
		return
	}

	visualization.Metadata = json.Metadata
	visualization.Field = *field
	visualization.UpdatedAt = time.Now()

	if err := serviceProvider.GetVisualizationService().UpdateVisualization(*visualization); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update visualization."})
		return
	}

	err = serviceProvider.GetLogService().AddLog("Modified a visualization.", *user, &field.ProjectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a log entry."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func deleteVisualizationRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	if os.Getenv("DISABLE_SIGN_UP") == "true" {
		c.JSON(http.StatusForbidden, responses.Error{Error: "Cannot make any additions or edits while in demo mode."})
		return
	}

	visualizationId, err := strconv.Atoi(c.Param("visualizationId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :visualizationId parameter provided."})
		return
	}

	visualization, err := serviceProvider.GetVisualizationService().GetVisualization(uint(visualizationId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find visualization."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetField(visualization.FieldID, *user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get corresponding field."})
		return
	}

	err = serviceProvider.GetVisualizationService().DeleteVisualization(*visualization)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete visulization."})
		return
	}

	err = serviceProvider.GetLogService().AddLog("Deleted a visualization.", *user, &field.ProjectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a log entry."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func initVisualizationsController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	usersRouterGroup := routerGroup.Group("/visualizations")
	usersRouterGroup.Use(sessionMiddleware)

	usersRouterGroup.POST("/", addVisualizationRoute)
	usersRouterGroup.GET("/:projectId", getVisualizationsRoute)
	usersRouterGroup.PUT("/", updateVisualizationRoute)
	usersRouterGroup.DELETE("/:visualizationId", deleteVisualizationRoute)
}
