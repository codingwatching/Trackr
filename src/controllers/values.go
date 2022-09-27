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

func getValuesRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	var json requests.GetValues
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	if json.Order != "asc" && json.Order != "desc" {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid order parameter provided."})
		return
	}

	if json.Offset < 0 {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid offset parameter provided."})
		return
	}

	if json.Limit < 0 {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid limit parameter provided."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetFieldByUser(json.FieldID, *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find field."})
		return
	}

	values, err := serviceProvider.GetValueService().GetValues(*field, *user, json.Order, json.Offset, json.Limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get values."})
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

	c.JSON(http.StatusOK, responses.ValueList{Values: valueList})
}

func deleteValueRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	valueId, err := strconv.Atoi(c.Param("valueId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid :valueId parameter provided."})
		return
	}

	value, err := serviceProvider.GetValueService().GetValue(uint(valueId), *user)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find value."})
		return
	}

	err = serviceProvider.GetValueService().DeleteValue(*value)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete value."})
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

	field, err := serviceProvider.GetFieldService().GetFieldByAPIKey(json.FieldID, json.APIKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Failed to find field."})
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
	valuesRouterGroup.DELETE("/:valueId", deleteValueRoute)

	apiValuesRouterGroup := routerGroup.Group("/values")
	apiValuesRouterGroup.POST("/", addValueRoute)
}
