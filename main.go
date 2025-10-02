package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/extractors"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/csrf"
)

func main() {

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
	app.Use(csrf.New(csrf.Config{
		CookieName:     "XSRF-Token",
		TrustedOrigins: []string{"http://localhost:3000", "https://localhost:3000"},
		Extractor: extractors.Chain(
			extractors.FromCookie("XSRF-Token"),
			extractors.FromHeader("XSRF-Token"),
			extractors.FromForm("_token"),
		),
		CookieSecure:   true,
		CookieHTTPOnly: true,
	}))
	app.Listen(":8000", fiber.ListenConfig{
		CertFile:      "./certs/cert.pem",
		CertKeyFile:   "./certs/key.pem",
		EnablePrefork: true,
	})
}
