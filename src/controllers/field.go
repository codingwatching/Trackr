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

var fieldType = map[int]string{1: "bool", 2: "int", 3: "float", 4: "string"}


func getValidProject (c *gin.Context, projectId uint)(*models.Project,error){
	user := getLoggedInUser(c)
	if project, err := serviceProvider.GetProjectService().GetProjectByIdAndUser(projectId, *user); err !=nil {
		return nil, err
	}else{
		return project, nil
	}			
}


func addFieldRoute(c *gin.Context) {
	
	var json requests.AddField
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	project, err := getValidProject(c,json.ProjectId)
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Project does not exist or does not belong to you."})
		return
	}

	t := json.Type
	if _, validField := fieldType[t]; !validField{
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request provided; Not a valid field type."})
		return
	}

	field  := models.Field{
		Name: 	`json."name"`,
		Type: 	t,
		Project: *project,
	}
		

	if err := serviceProvider.GetFieldService().AddField(field); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to create a new field."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}


func getFieldsRoute(c *gin.Context) {

	projectId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :project_id parameter provided."})
		return
	}

	if _, err := getValidProject(c,uint(projectId));err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Project does not exist or does not belong to you."})
		return
	}

	fields, err := serviceProvider.GetFieldService().GetFieldsByProjectId(uint(projectId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to get fields."})
		return
	}

	fieldList := make([]responses.Field, len(fields))
	for index, field := range fields {
		fieldList[index] = responses.Field{
			ID:   field.ID,
			Name: field.Name,
			Type: field.Type,	
		}
	}

	c.JSON(http.StatusOK, responses.FeildList{Fields: fieldList})
}


func updateFieldRoute(c *gin.Context){
	

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :id parameter provided."})
		return
	}

	projectId, err := strconv.Atoi(c.Param("project_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :project_id parameter provided."})
		return
	}

	if _, err := getValidProject(c,uint(projectId));err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Project access Denied."})
		return
	}

	field, err := serviceProvider.GetFieldService().GetFieldByIdAndProject(uint(id), uint(projectId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to find field."})
		return
	}

	
	if c.Param("name") != ""{
		field.Name = c.Param("name")
	}

	err = serviceProvider.GetFieldService().UpdateField(*field)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update project."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}



func deleteFieldRoute(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :id parameter provided."})
		return
	}

	projectId, err := strconv.Atoi(c.Param("project_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Invalid :project_id parameter provided."})
		return
	}

	if _, err := getValidProject(c,uint(projectId));err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Project access Denied."})
		return
	}

	err = serviceProvider.GetFieldService().DeleteFieldByIdAndProject(uint(id), uint(projectId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete project."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}


func initFieldController(router *gin.Engine, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	routerGroup := router.Group("/fields")
	routerGroup.Use(sessionMiddleware)

	routerGroup.POST("/", addFieldRoute)
	routerGroup.GET("/", getFieldsRoute)
	routerGroup.PUT("/:project_id", updateFieldRoute)
	routerGroup.DELETE("/:project_id", deleteFieldRoute)
}