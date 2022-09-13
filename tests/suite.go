package tests

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"time"

	"trackr/src/controllers"
	"trackr/src/db"
	"trackr/src/models"
	"trackr/src/services"
)

type Suite struct {
	Router  *gin.Engine
	Service services.ServiceProvider

	User           models.User
	Project        models.Project
	Session        models.Session
	ExpiredSession models.Session
	Time           time.Time
}

func Startup() *Suite {
	var suite Suite

	suite.Service = db.InitServiceProvider(sqlite.Open(":memory:"))
	suite.Time = time.Now()
	suite.User = models.User{
		ID:        1,
		Email:     "Email@email",
		Password:  "$2a$12$Z4Ko/2d/EfenK9nBtpBRVO8I/3yOPnpcT/D/sbueRmhVDujVjHT4S",
		FirstName: "FirstName",
		LastName:  "LastName",
		CreatedAt: suite.Time,
	}
	suite.Service.GetUserService().AddUser(suite.User)

	suite.Project = models.Project{
		ID:          1,
		Name:        "Name",
		Description: "Description",
		APIKey:      "APIKey",
		CreatedAt:   suite.Time,

		UserID: suite.User.ID,
		User:   suite.User,
	}
	suite.Service.GetProjectService().AddProject(suite.Project)

	suite.Session = models.Session{
		ID:        "SessionID",
		CreatedAt: suite.Time,
		ExpiresAt: suite.Time.AddDate(1, 0, 0),

		UserID: suite.User.ID,
		User:   suite.User,
	}
	suite.Service.GetSessionService().AddSession(suite.Session)

	suite.ExpiredSession = models.Session{
		ID:        "ExpiredSessionID",
		CreatedAt: suite.Time,
		ExpiresAt: suite.Time,

		UserID: suite.User.ID,
		User:   suite.User,
	}
	suite.Service.GetSessionService().AddSession(suite.ExpiredSession)

	return &suite
}

func StartupWithRouter() *Suite {
	suite := Startup()
	suite.Router = controllers.InitRouter(suite.Service)

	return suite
}
