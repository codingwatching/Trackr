package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"trackr/src/forms/requests"
	"trackr/src/forms/responses"
	"trackr/src/services"
)

func getUserRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	c.JSON(http.StatusOK, responses.User{
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		MaxValues:   user.MaxValues,
		MaxProjects: user.MaxProjects,
	})
}

func updateUserRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	var json requests.UpdateUser
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, responses.Error{Error: "Invalid request parameters provided."})
		return
	}

	if json.FirstName != "" {
		user.FirstName = json.FirstName
	}

	if json.LastName != "" {
		user.LastName = json.LastName
	}

	if json.CurrentPassword != "" && json.NewPassword != "" {
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(json.CurrentPassword)); err != nil {
			c.JSON(http.StatusBadRequest, responses.Error{Error: "Incorrect current password."})
			return
		}

		newHashedPassword, err := generateHashedPassword(json.NewPassword)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to generate new hashed password."})
			return
		}

		user.Password = newHashedPassword
	}

	if err := serviceProvider.GetUserService().UpdateUser(*user); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to update user."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func deleteUserRoute(c *gin.Context) {
	user := getLoggedInUser(c)

	if err := serviceProvider.GetUserService().DeleteUser(*user); err != nil {
		c.JSON(http.StatusInternalServerError, responses.Error{Error: "Failed to delete user."})
		return
	}

	c.JSON(http.StatusOK, responses.Empty{})
}

func initUsersController(router *gin.Engine, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	routerGroup := router.Group("/api/users")
	routerGroup.Use(sessionMiddleware)

	routerGroup.GET("/", getUserRoute)
	routerGroup.PUT("/", updateUserRoute)
	routerGroup.DELETE("/", deleteUserRoute)
}
