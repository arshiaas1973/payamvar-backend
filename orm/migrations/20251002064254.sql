-- Create "chats" table
CREATE TABLE "chats" (
  "id" bigserial NOT NULL,
  "created_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "deleted_at" timestamptz NULL,
  "chat_name" character varying(100) NOT NULL,
  PRIMARY KEY ("id")
);
-- Create index "idx_chats_deleted_at" to table: "chats"
CREATE INDEX "idx_chats_deleted_at" ON "chats" ("deleted_at");
-- Create "users" table
CREATE TABLE "users" (
  "id" bigserial NOT NULL,
  "created_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "deleted_at" timestamptz NULL,
  "user_firstname" character varying(60) NULL,
  "user_lastname" character varying(60) NULL,
  "user_name" character varying(100) NOT NULL,
  "user_password" text NOT NULL,
  "user_email" text NOT NULL,
  PRIMARY KEY ("id")
);
-- Create index "idx_users_deleted_at" to table: "users"
CREATE INDEX "idx_users_deleted_at" ON "users" ("deleted_at");
-- Create index "idx_users_username" to table: "users"
CREATE UNIQUE INDEX "idx_users_username" ON "users" ("user_name");
-- Create "user_chats" table
CREATE TABLE "user_chats" (
  "user_id" bigint NOT NULL,
  "chat_id" bigint NOT NULL,
  PRIMARY KEY ("user_id", "chat_id"),
  CONSTRAINT "fk_user_chats_chat" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fk_user_chats_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
