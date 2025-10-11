package api

import (
	"time"

	"github.com/arshiaas1973/payamvar-backend/middlewares"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/extractors"
	"github.com/gofiber/fiber/v3/middleware/csrf"
	"github.com/gofiber/fiber/v3/middleware/session"
	"github.com/gofiber/utils/v2"
)

func GetAPI(engine *fiber.App) fiber.Router{
	api := engine.Group("/api",middlewares.API)
	api.Use(engine.Use(csrf.New(csrf.Config{
		CookieName:     "XSRF-Token",
		TrustedOrigins: []string{"http://localhost:3000", "https://localhost:3000"},
		Extractor: extractors.Chain(
			extractors.FromCookie("XSRF-Token"),
			extractors.FromHeader("XSRF-Token"),
			extractors.FromForm("_token"),
		),
		CookieSecure:      true,
		CookieSessionOnly: true,
		KeyGenerator:      utils.UUID,
		Session: &session.Store{Config: session.Config{
			CookieSecure:    true,
			CookieHTTPOnly:  true,
			CookieSameSite:  "Lax",
			IdleTimeout:     30 * time.Minute,
			AbsoluteTimeout: 24 * time.Hour,
		}},
	})))
	return api
}