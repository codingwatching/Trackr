package controllers

import (
	"github.com/gin-gonic/gin"

	"trackr/src/services"
)

var (
	serviceProvider services.ServiceProvider
)

func InitRouter(serviceProviderInput services.ServiceProvider) *gin.Engine {
	serviceProvider = serviceProviderInput

	router := gin.Default()
	sessionMiddleware := initAuthMiddleware(serviceProvider)

	initAuthController(router, serviceProvider)
	initProjectsController(router, serviceProvider, sessionMiddleware)
	initFieldController(router, serviceProvider, sessionMiddleware)

	return router
}
