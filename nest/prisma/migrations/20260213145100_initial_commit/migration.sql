-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(200),
    "bio" VARCHAR(500),
    "birthday" VARCHAR(12),
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMediaOnUser" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "media_id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMediaOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMedia" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "UserMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "deviceName" VARCHAR(200) NOT NULL,
    "ipAddress" VARCHAR(45) NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 1,
    "last_seen" VARCHAR(100) NOT NULL DEFAULT 'Online',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_resetToken_username_idx" ON "User"("email", "resetToken", "username");

-- AddForeignKey
ALTER TABLE "UserMediaOnUser" ADD CONSTRAINT "UserMediaOnUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMediaOnUser" ADD CONSTRAINT "UserMediaOnUser_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
