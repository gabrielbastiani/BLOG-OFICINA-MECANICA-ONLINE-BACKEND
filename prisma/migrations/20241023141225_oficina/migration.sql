-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('SUPER_ADMIN', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusProductCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "MainCategoryPost" AS ENUM ('Sim', 'Nao');

-- CreateEnum
CREATE TYPE "StatusComment" AS ENUM ('Fila', 'Aprovar', 'Rejeitar', 'Spam', 'Lixeira');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(295) NOT NULL,
    "slug_name" VARCHAR(295) NOT NULL,
    "image_user" TEXT,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'Disponivel',
    "role" "RoleUser" NOT NULL DEFAULT 'SUPER_ADMIN',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwordrecoveryusers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "passwordrecoveryusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name_category" VARCHAR(300) NOT NULL,
    "slug_name_category" VARCHAR(300) NOT NULL,
    "image_category" TEXT,
    "description" VARCHAR(15725),
    "status" "StatusCategory" NOT NULL DEFAULT 'Disponivel',
    "order" INTEGER,
    "parentId" TEXT,
    "nivel" INTEGER,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" VARCHAR(395) NOT NULL,
    "slug_title_post" TEXT NOT NULL,
    "text_post" TEXT NOT NULL,
    "image_post" TEXT,
    "status" "StatusProduct" NOT NULL DEFAULT 'Disponivel',
    "tags" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postcategories" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "name_category" TEXT NOT NULL,
    "order" INTEGER,
    "status" "StatusProductCategory" NOT NULL DEFAULT 'Disponivel',
    "main_category" "MainCategoryPost" NOT NULL DEFAULT 'Nao',
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "postcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "slug_author" TEXT NOT NULL,
    "comment" VARCHAR(5000) NOT NULL,
    "nivel" INTEGER,
    "parentId" TEXT,
    "status" "StatusComment" NOT NULL DEFAULT 'Fila',
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_contacts" (
    "id" TEXT NOT NULL,
    "name_user" VARCHAR(200) NOT NULL,
    "slug_name_user" TEXT NOT NULL,
    "email_user" VARCHAR(200) NOT NULL,
    "subject" VARCHAR(250) NOT NULL,
    "menssage" VARCHAR(5000) NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "form_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "name_user" VARCHAR(100) NOT NULL,
    "email_user" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_category_key" ON "categories"("name_category");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postcategories" ADD CONSTRAINT "postcategories_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postcategories" ADD CONSTRAINT "postcategories_name_category_fkey" FOREIGN KEY ("name_category") REFERENCES "categories"("name_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
