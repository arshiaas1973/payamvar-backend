package v1

import (
	"errors"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"golang.org/x/crypto/bcrypt"
	"golang.org/x/crypto/sha3"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	main "github.com/arshiaas1973/payamvar-backend"
	"github.com/arshiaas1973/payamvar-backend/api"
	"github.com/arshiaas1973/payamvar-backend/middlewares"
	"github.com/arshiaas1973/payamvar-backend/orm/models"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func Handler(engine *fiber.App) {
	api := api.GetAPI(engine)
	v1api := api.Group("/api/v1", middlewares.API)
	users := v1api.Group("/users")
	users.Post("/login", middlewares.Guest, Login)
}

func Login(ctx fiber.Ctx) error {
	var username string = ctx.FormValue("username", "")
	var password string = ctx.FormValue("password", "")
	remember, err := strconv.ParseBool(ctx.FormValue("rememberMe", "true"))

	if username == "" || password == "" || err != nil {
		ctx.Status(http.StatusBadRequest)
		return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.requiredFields"})
	}
	passwordEnc1, err := bcrypt.GenerateFromPassword([]byte(password), 15)
	if err != nil {
		ctx.Status(http.StatusInternalServerError)
		return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.serverError", "message": "errors.passwordCalcError"})
	}
	var passwordEnc2 string = string(sha3.New512().Sum(passwordEnc1)[:])
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
			Username: username,
			Password: passwordEnc2,
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
	var CookieAge int = 7 * 24 * 60 * 60
	if !remember {
		CookieAge = 60 * 60
	}
	// Secret Key for JWT
	secret := os.Getenv("SECRET_KEY")
	if len(secret) <= 0 {
		DB, err := db.DB()
		DB.Close()
		if errors.Is(models.ErrRecordExists, err) {
			ctx.Status(http.StatusOK)
			return ctx.JSON(map[string]interface{}{"status": "success", "result": false})
		}
		fmt.Println("Error: Unable to load secret key for cookies")
			ctx.Status(http.StatusInternalServerError)
			return ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.serverError", "message": "errors.rememberingUser"})
	}
	token := jwt.NewWithClaims(jwt.SigningMethodES512,
		jwt.MapClaims{
			"id":        User.ID.(string),
			"firstname": User.FirstName,
			"lastname":  User.LastName,
			"username":  User.Username,
			"email":     User.Email,
			"iat":       time.Now().Unix(),
			"exp":       time.Now().Add(time.Second * time.Duration(CookieAge)).Unix(),
		},
	)
	SignedToken, err := token.SignedString(secret)
	if err != nil {
		DB, err := db.DB()
		DB.Close()
		if errors.Is(models.ErrRecordExists, err) {
			ctx.Status(http.StatusOK)
			return ctx.JSON(map[string]interface{}{"status": "success", "result": false})
		}
		ctx.Status(http.StatusInternalServerError)
		ctx.JSON(map[string]interface{}{"status": "failed", "result": "errors.serverError", "message": "errors.rememberingUser"})
	}
	ctx.Cookie(&fiber.Cookie{
		Name:     "UA", // User Authontication Cookie
		Value:    SignedToken,
		MaxAge:   CookieAge,
		Path:     "/",
		SameSite: "lax",
		Secure:   true,
		HTTPOnly: true,
	})
	DB, err := db.DB()
	DB.Close()
	return ctx.JSON(map[string]interface{}{"status": "success", "result": true})
}
