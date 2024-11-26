-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('SUPER_ADMIN', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusUserBlog" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusPost" AS ENUM ('Disponivel', 'Indisponivel');

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

-- CreateTable
CREATE TABLE "passwordrecoveryusers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "passwordrecoveryusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name_category" TEXT NOT NULL,
    "slug_name_category" VARCHAR(300) NOT NULL,
    "image_category" TEXT,
    "description" VARCHAR(15725),
    "status" "StatusCategory" NOT NULL DEFAULT 'Disponivel',
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "slug_tag_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" VARCHAR(395) NOT NULL,
    "slug_title_post" TEXT NOT NULL,
    "text_post" TEXT NOT NULL,
    "image_post" TEXT,
    "post_like" INTEGER DEFAULT 0,
    "status" "StatusPost" NOT NULL DEFAULT 'Disponivel',
    "publish_at" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_on_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "category_on_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_on_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "tag_on_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "userBlog_id" TEXT NOT NULL,
    "comment" VARCHAR(5000) NOT NULL,
    "nivel" INTEGER,
    "parentId" TEXT,
    "comment_like" INTEGER,
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

-- CreateTable
CREATE TABLE "notificationusers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "type" TEXT NOT NULL,
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
    "type" TEXT NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "notificationuserblogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userblogs_name_key" ON "userblogs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "userblogs_email_key" ON "userblogs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_category_key" ON "categories"("name_category");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_name_key" ON "tags"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "category_on_posts_post_id_category_id_key" ON "category_on_posts"("post_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_on_posts_post_id_tag_id_key" ON "tag_on_posts"("post_id", "tag_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationusers" ADD CONSTRAINT "notificationusers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationuserblogs" ADD CONSTRAINT "notificationuserblogs_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
