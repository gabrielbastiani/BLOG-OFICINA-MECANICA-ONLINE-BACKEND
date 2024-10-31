/*
  Warnings:

  - The `status` column on the `postcategories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusUserBlog" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusPost" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusPostCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- AlterTable
ALTER TABLE "postcategories" DROP COLUMN "status",
ADD COLUMN     "status" "StatusPostCategory" NOT NULL DEFAULT 'Disponivel';

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "status",
ADD COLUMN     "status" "StatusPost" NOT NULL DEFAULT 'Disponivel';

-- DropEnum
DROP TYPE "StatusProduct";

-- DropEnum
DROP TYPE "StatusProductCategory";

-- CreateTable
CREATE TABLE "userblogs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(295) NOT NULL,
    "slug_name" VARCHAR(295) NOT NULL,
    "image_user" TEXT,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "status" "StatusUserBlog" NOT NULL DEFAULT 'Disponivel',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userblogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userblogs_name_key" ON "userblogs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "userblogs_email_key" ON "userblogs"("email");
