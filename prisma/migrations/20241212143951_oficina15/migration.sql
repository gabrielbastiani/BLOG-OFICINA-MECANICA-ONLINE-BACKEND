/*
  Warnings:

  - You are about to drop the column `local_site` on the `marketingpublications` table. All the data in the column will be lost.
  - You are about to drop the column `popup_behavior` on the `marketingpublications` table. All the data in the column will be lost.
  - You are about to drop the column `popup_conditions` on the `marketingpublications` table. All the data in the column will be lost.
  - You are about to drop the column `popup_position` on the `marketingpublications` table. All the data in the column will be lost.
  - The `status` column on the `marketingpublications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[custom_url]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusMarketingPublication" AS ENUM ('Programado', 'Disponivel', 'Indisponivel');

-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "local_site",
DROP COLUMN "popup_behavior",
DROP COLUMN "popup_conditions",
DROP COLUMN "popup_position",
DROP COLUMN "status",
ADD COLUMN     "status" "StatusMarketingPublication" NOT NULL DEFAULT 'Disponivel';

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "custom_url" TEXT,
ADD COLUMN     "seo_description" VARCHAR(300),
ADD COLUMN     "seo_keywords" VARCHAR(500);

-- DropEnum
DROP TYPE "StatusBanner";

-- CreateTable
CREATE TABLE "configurationsblog" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(725),
    "logo" TEXT,
    "description_blog" VARCHAR(15725),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configurationsblog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sitemaps" (
    "id" TEXT NOT NULL,
    "post_id" UUID,
    "custom_url_map" TEXT NOT NULL,
    "priority" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "changefreq" TEXT NOT NULL DEFAULT 'weekly',
    "is_indexed" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sitemaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configurationsmarketingpublications" (
    "id" TEXT NOT NULL,
    "local_site" TEXT,
    "popup_position" TEXT,
    "popup_behavior" TEXT,
    "popup_conditions" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configurationsmarketingpublications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configurationsmarketingonpublications" (
    "id" UUID NOT NULL,
    "marketingPublication_id" UUID NOT NULL,
    "configurationMarketingPublication_id" TEXT NOT NULL,

    CONSTRAINT "configurationsmarketingonpublications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sitemaps_post_id_key" ON "sitemaps"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "sitemaps_custom_url_map_key" ON "sitemaps"("custom_url_map");

-- CreateIndex
CREATE UNIQUE INDEX "configurationsmarketingonpublications_marketingPublication__key" ON "configurationsmarketingonpublications"("marketingPublication_id", "configurationMarketingPublication_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_custom_url_key" ON "posts"("custom_url");

-- AddForeignKey
ALTER TABLE "sitemaps" ADD CONSTRAINT "sitemaps_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurationsmarketingonpublications" ADD CONSTRAINT "configurationsmarketingonpublications_marketingPublication_fkey" FOREIGN KEY ("marketingPublication_id") REFERENCES "marketingpublications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurationsmarketingonpublications" ADD CONSTRAINT "configurationsmarketingonpublications_configurationMarketi_fkey" FOREIGN KEY ("configurationMarketingPublication_id") REFERENCES "configurationsmarketingpublications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
