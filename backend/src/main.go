package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"trackr/src/controllers"
	"trackr/src/db"
)

func main() {
	godotenv.Load()

	var dialector gorm.Dialector
	if os.Getenv("DB_TYPE") == "sqlite" {
		dialector = sqlite.Open(os.Getenv("DB_CONNECTION_STRING"))
	} else {
		panic("Unsupported database type")
	}

	if os.Getenv("MODE") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	serviceProvider := db.InitServiceProvider(dialector)
	router := controllers.InitRouter(serviceProvider)
	router.Run()
}
