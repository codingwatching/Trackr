package services_impl

import (
	"gorm.io/gorm"
	"trackr/src/models"
	"trackr/src/services"
	"trackr/src/services_impl/db"
)

type ServiceProvider struct {
	sessionService       services.SessionService
	userService          services.UserService
	projectService       services.ProjectService
	fieldService         services.FieldService
	visualizationService services.VisualizationService
	valueService         services.ValueService
	logService           services.LogService
}

func InitServiceProvider(dialector gorm.Dialector) services.ServiceProvider {
	database, err := gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		return nil
	}

	database.SetupJoinTable(&models.User{}, "Projects", &models.UserProject{})
	database.SetupJoinTable(&models.User{}, "Organizations", &models.UserOrganization{})

	database.AutoMigrate(&models.User{})
	database.AutoMigrate(&models.Session{})
	database.AutoMigrate(&models.Project{})
	database.AutoMigrate(&models.Field{})
	database.AutoMigrate(&models.Value{})
	database.AutoMigrate(&models.Visualization{})
	database.AutoMigrate(&models.Log{})

	serviceProvider := &ServiceProvider{}
	serviceProvider.sessionService = &db.SessionService{DB: database}
	serviceProvider.userService = &db.UserService{DB: database}
	serviceProvider.projectService = &db.ProjectService{DB: database}
	serviceProvider.fieldService = &db.FieldService{DB: database}
	serviceProvider.valueService = &db.ValueService{DB: database}
	serviceProvider.visualizationService = &db.VisualizationService{DB: database}
	serviceProvider.logService = &db.LogService{DB: database}

	return serviceProvider
}

func (serviceProvider *ServiceProvider) GetSessionService() services.SessionService {
	return serviceProvider.sessionService
}

func (serviceProvider *ServiceProvider) GetUserService() services.UserService {
	return serviceProvider.userService
}

func (serviceProvider *ServiceProvider) GetProjectService() services.ProjectService {
	return serviceProvider.projectService
}

func (serviceProvider *ServiceProvider) GetFieldService() services.FieldService {
	return serviceProvider.fieldService
}

func (serviceProvider *ServiceProvider) GetVisualizationService() services.VisualizationService {
	return serviceProvider.visualizationService
}

func (serviceProvider *ServiceProvider) GetValueService() services.ValueService {
	return serviceProvider.valueService
}

func (serviceProvider *ServiceProvider) GetLogService() services.LogService {
	return serviceProvider.logService
}
