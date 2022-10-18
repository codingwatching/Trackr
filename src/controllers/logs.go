package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/models"
	"trackr/src/services"
)

func getUserLogsRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	logs, err := serviceProvider.GetLogsService().GetUserLogs(*user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get user logs."})
		return
	}

	logList := make([]responses.Log, len(logs))
	for index, log := range logs {
		logList[index] = responses.Log{
			Message:   log.Message,
			CreatedAt: log.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, responses.LogList{Logs: logList})
}

func getProjectLogsRoute(c *gin.Context) {
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

	logs, err := serviceProvider.GetLogsService().GetProjectLogs(*project, *user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get user logs."})
		return
	}

	logList := make([]responses.Log, len(logs))
	for index, log := range logs {
		logList[index] = responses.Log{
			Message:   log.Message,
			CreatedAt: log.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, responses.LogList{Logs: logList})
}

func addLogsRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	var json requests.AddLog
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :projectId parameter provided."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProject(uint(projectId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Cannot find project."})
		return
	}

	createdAt := time.Now()

	log := models.Log{
		Message:   json.Message,
		CreatedAt: createdAt,
		Project:   *project,
		User:      *user,
	}

	visualizationId, err := serviceProvider.GetLogsService().AddLog(log)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a new visualization."})
		return
	}

	c.JSON(http.StatusOK, responses.NewVisualization{
		ID: visualizationId,
	})
}

func initLogsController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	usersRouterGroup := routerGroup.Group("/logs")
	usersRouterGroup.Use(sessionMiddleware)

	usersRouterGroup.GET("/", getUserLogsRoute)
	usersRouterGroup.GET("/:projectId", getProjectLogsRoute)
	usersRouterGroup.POST("/:projectId", addLogsRoute)
}
