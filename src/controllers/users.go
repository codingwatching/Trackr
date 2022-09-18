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

	wasModified := false

	if json.FirstName != "" {
		user.FirstName = json.FirstName
		wasModified = true
	}

	if json.LastName != "" {
		user.LastName = json.LastName
		wasModified = true
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
		wasModified = true
	}

	if wasModified {
		user.UpdatedAt = time.Now()
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

func initUsersController(routerGroup *gin.RouterGroup, serviceProviderInput services.ServiceProvider, sessionMiddleware gin.HandlerFunc) {
	serviceProvider = serviceProviderInput

	usersRouterGroup := routerGroup.Group("/users")
	usersRouterGroup.Use(sessionMiddleware)

	usersRouterGroup.GET("/", getUserRoute)
	usersRouterGroup.PUT("/", updateUserRoute)
	usersRouterGroup.DELETE("/", deleteUserRoute)
}
