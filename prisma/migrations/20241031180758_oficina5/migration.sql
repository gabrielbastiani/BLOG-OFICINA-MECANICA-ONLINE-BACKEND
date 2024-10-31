/*
  Warnings:

  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userBlog_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropTable
DROP TABLE "notifications";

-- CreateTable
CREATE TABLE "notificationusers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "message" VARCHAR(500) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "notificationusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationuserblogs" (
    "id" TEXT NOT NULL,
    "userBlog_id" TEXT,
    "message" VARCHAR(500) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "notificationuserblogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notificationusers" ADD CONSTRAINT "notificationusers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationuserblogs" ADD CONSTRAINT "notificationuserblogs_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
