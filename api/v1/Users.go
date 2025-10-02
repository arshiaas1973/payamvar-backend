package v1

import (
	"github.com/arshiaas1973/payamvar-backend/middlewares"
	"github.com/gofiber/fiber/v3"
)

func Handler (engine *fiber.App){
	api := engine.Group("/api/v1", middlewares.API)
	users := api.Group("/users")
	users.Post("/login",middlewares.Guest,Login)
}

func Login(ctx fiber.Ctx) error{

}