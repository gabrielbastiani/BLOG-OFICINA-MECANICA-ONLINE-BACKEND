/*
  Warnings:

  - You are about to drop the column `tags` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `postcategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "postcategories" DROP CONSTRAINT "postcategories_name_category_fkey";

-- DropForeignKey
ALTER TABLE "postcategories" DROP CONSTRAINT "postcategories_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "tags";

-- DropTable
DROP TABLE "postcategories";

-- DropEnum
DROP TYPE "MainCategoryPost";

-- DropEnum
DROP TYPE "StatusPostCategory";

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

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_name_key" ON "tags"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "category_on_posts_post_id_category_id_key" ON "category_on_posts"("post_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_on_posts_post_id_tag_id_key" ON "tag_on_posts"("post_id", "tag_id");

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
