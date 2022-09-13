package controllers

import (
	"github.com/gin-gonic/gin"
	"time"

	"trackr/src/common"
	"trackr/src/models"
)

func generateAPIKey() (string, error) {
	return common.RandomString(apiKeyLength)
}

func getLoggedInUser(c *gin.Context) *models.User {
	return c.MustGet("user").(*models.User)
}

func isLoggedIn(c *gin.Context) *models.User {
	sessionId, err := c.Cookie(sessionCookie)
	if err != nil {
		return nil
	}

	session, user, err := serviceProvider.GetSessionService().GetSessionAndUserById(sessionId)
	if err != nil {
		return nil
	}

	if session.ExpiresAt.Before(time.Now()) {
		return nil
	}

	return user
}
