package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/models"
	"trackr/src/services"
)

func getValuesRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	var query requests.GetValues
	if err := c.ShouldBindQuery(&query); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	if query.Order != "asc" && query.Order != "desc" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid order parameter provided."})
		return
	}

	if query.Offset < 0 {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid offset parameter provided."})
		return
	}

	if query.Limit < 0 {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid limit parameter provided."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetField(query.FieldID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find field."})
		return
	}

	values, err := serviceProvider.GetValueService().GetValues(*field, *user, query.Order, query.Offset, query.Limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get values."})
		return
	}

	totalValues, err := serviceProvider.GetValueService().GetNumberOfValuesByField(*field)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get total number of values."})
		return
	}

	valueList := make([]responses.Value, len(values))
	for index, value := range values {
		valueList[index] = responses.Value{
			ID:        value.ID,
			Value:     value.Value,
			CreatedAt: value.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, responses.ValueList{
		Values:      valueList,
		TotalValues: totalValues,
	})
}

func deleteValuesRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	fieldId, err := strconv.Atoi(c.Param("fieldId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :fieldId parameter provided."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetField(uint(fieldId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find field."})
		return
	}

	err = serviceProvider.GetValueService().DeleteValues(*field)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete values."})
		return
	}

	err = serviceProvider.GetLogService().AddLog(fmt.Sprintf(
		"Delete all values associated to the field %s.", field.Name),
		*user,
		&field.ProjectID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a log entry."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func addValueRoute(c *gin.Context) {
	var json requests.AddValue
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	if json.Value == "" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "The value cannot be empty."})
		return
	}

	project, err := serviceProvider.GetProjectService().GetProjectByAPIKey(json.APIKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find project, invalid API key."})
		return
	}

	numberOfValues, err := serviceProvider.GetValueService().GetNumberOfValuesByUser(project.User)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to get number of values."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetField(json.FieldID, project.User)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find field."})
		return
	}

	if project.User.MaxValues > 0 && numberOfValues >= int64(project.User.MaxValues) {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "You have exceeded your max values limit."})
		return
	}

	value := models.Value{
		Value:     json.Value,
		CreatedAt: time.Now(),

		Field: *field,
	}

	err = serviceProvider.GetValueService().AddValue(value)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to add value."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func initValuesController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	valuesRouterGroup := routerGroup.Group("/values")
	valuesRouterGroup.Use(sessionMiddleware)
	valuesRouterGroup.GET("/", getValuesRoute)
	valuesRouterGroup.DELETE("/:fieldId", deleteValuesRoute)

	externalValuesRouterGroup := routerGroup.Group("/values")
	externalValuesRouterGroup.POST("/", addValueRoute)
}
