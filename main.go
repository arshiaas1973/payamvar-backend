package main

import (
	"fmt"
	"log"
	"os"
	"time"

	Users "github.com/arshiaas1973/payamvar-backend/api/v1"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/csrf"
	"github.com/joho/godotenv"
)

var ProgramEnv string = "production"
var IsDev bool = false

func main() {

	if os.Getenv("PRG_ENV") == "development" || os.Getenv("PRG_ENV") == "" {
		ProgramEnv = "development"
		IsDev = true
	} else {
		ProgramEnv = "production"
		IsDev = false
	}
	err := godotenv.Load(fmt.Sprintf(".env.%s", ProgramEnv))
	if err != nil {
		log.Fatal("Error while loading environment file")
	}

	app := fiber.New(fiber.Config{
		CaseSensitive: true,
		StrictRouting: true,
		ServerHeader:  "Fiber",
		AppName:       "Payamvar",
	})
	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "PUT", "DELETE"},
		AllowHeaders:     []string{"X-API-KEY", "XSRF-Token"},
		AllowCredentials: true,
	}))

	app.Get("/csrf", func(c fiber.Ctx) error {
		token := csrf.TokenFromContext(c)
		c.Response().Header.Add("XSRF-Token", token)
		c.Cookie(&fiber.Cookie{
			Name:     "XSRF-Token",
			MaxAge:   int((3 * time.Hour).Abs().Milliseconds()),
			Value:    token,
			Secure:   true,
			HTTPOnly: true,
			SameSite: "lax",
		})
		c.Status(200)
		return c.JSON(map[string]string{"_token": token})
	})
	Users.Handler(app)
	app.Listen(":8000", fiber.ListenConfig{
		CertFile:      "./certs/cert.pem",
		CertKeyFile:   "./certs/key.pem",
		EnablePrefork: true,
	})
}
