package middlewares

import (
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"
)

func API(ctx fiber.Ctx) error {
	err := godotenv.Load("../.env")
	if err != nil {
		ctx.Status(http.StatusInternalServerError)
		ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.ServerError"})
		log.Fatal("Failed to load environment variables")
	}
	key := os.Getenv("API_KEY")
	if len(key) <= 0 {
		ctx.Status(http.StatusInternalServerError)
		ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.ServerError"})
		log.Fatal("Failed to load environment variables. ENV_API_KEY")
	}
	HeaderKey := ctx.GetHeaders()["X-API-KEY"]
	if len(HeaderKey) <= 0 {
		ctx.Status(http.StatusUnauthorized)
		return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.UnAuthorized"})
	}
	return ctx.Next()
}
