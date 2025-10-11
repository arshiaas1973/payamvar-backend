package middlewares

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	main "github.com/arshiaas1973/payamvar-backend"
	"github.com/arshiaas1973/payamvar-backend/orm/models"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Guest(ctx fiber.Ctx) error {
	cookie := ctx.Cookies("UA", "")
	if cookie != "" {
		secret := os.Getenv("SECRET_KEY")
		if len(secret) <= 0 {
			fmt.Println("Error: Unable to load secret key for cookies")
			ctx.Status(http.StatusInternalServerError)
			return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.serverError", "message": "errors.rememberingUser"})
		}
		token, err := jwt.Parse(cookie, func(token *jwt.Token) (any, error) {
			// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
			return secret, nil
		}, jwt.WithValidMethods([]string{jwt.SigningMethodHS512.Alg()}))
		if err != nil {
			ctx.ClearCookie("UA")
			return ctx.Next()
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.ClearCookie("UA")
			return ctx.Next()
		}
		var cs string = os.Getenv("DB_URL")
		DBCfg := gorm.Config{}
		if main.IsDev {
			DBCfg.Logger = logger.New(
				log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
				logger.Config{
					SlowThreshold:             time.Second,   // Slow SQL threshold
					LogLevel:                  logger.Silent, // Log level
					IgnoreRecordNotFoundError: true,          // Ignore ErrRecordNotFound error for logger
					ParameterizedQueries:      true,          // Don't include params in the SQL log
					Colorful:                  false,         // Disable color
				},
			)
		}
		db, err := gorm.Open(postgres.Open(cs), &DBCfg)
		if err != nil {
			ctx.Status(http.StatusInternalServerError)
			return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.serverError", "message": "errors.dbConnection"})
		}
		var User models.User
		err = db.Transaction(func(tx *gorm.DB) error {
			User = models.User{
				ID: int(claims["id"]),
			}
			q := tx.First(&User)
			if q.RowsAffected <= 0 {
				return &models.ErrRecordExists{}
			}
			return nil
		})
		if err != nil {
			DB, err := db.DB()
			DB.Close()
			if errors.Is(models.ErrRecordExists, err) {
				ctx.Status(http.StatusOK)
				return ctx.JSON(map[string]interface{}{"status": "success", "result": false})
			}
			ctx.Status(http.StatusInternalServerError)
			return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.serverError", "message": "errors.dbTransaction"})
		}
		ctx.Status(http.StatusForbidden)
		return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.accessForbidden"})
	}

}
