package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string `gorm:"column:user_firstname;size:60" json:"firstname"`
	LastName  string `gorm:"column:user_lastname;size:60" json:"lastname"`
	Username  string `gorm:"column:user_name;size:100;uniqueIndex;not null" json:"username"`
	Password  string `gorm:"column:user_password;type:text;not null;" json:"-"`
	Email     string `gorm:"column:user_email;type:text;not null;" json:"email"`
	Chats     []Chat `gorm:"many2many:user_chats"`
}

type Chat struct {
	gorm.Model
	Name  string `gorm:"column:chat_name;size:100;not null;" json:"name"`
	Users []User `gorm:"many2many:user_chats"`
}

func (User) TableName() string {
	return "users"
}
