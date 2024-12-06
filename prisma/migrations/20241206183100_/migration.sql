/*
  Warnings:

  - You are about to alter the column `ipAddress` on the `postviews` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.

*/
-- CreateEnum
CREATE TYPE "StatusBanner" AS ENUM ('Disponivel', 'Indisponivel');

-- AlterTable
ALTER TABLE "postviews" ALTER COLUMN "ipAddress" SET DATA TYPE VARCHAR(45);

-- CreateTable
CREATE TABLE "marketingpublications" (
    "id" UUID NOT NULL,
    "title" VARCHAR(555) NOT NULL,
    "description" VARCHAR(7000),
    "image_url" VARCHAR(4083) NOT NULL,
    "redirect_url" VARCHAR(5083) NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "status" "StatusBanner" NOT NULL DEFAULT 'Disponivel',
    "publish_at" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "marketingpublications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketingpublicationviews" (
    "id" UUID NOT NULL,
    "marketingPublication_id" UUID NOT NULL,
    "ipAddress" VARCHAR(45),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketingpublicationviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "marketingpublicationviews_marketingPublication_id_ipAddress_key" ON "marketingpublicationviews"("marketingPublication_id", "ipAddress");

-- AddForeignKey
ALTER TABLE "marketingpublicationviews" ADD CONSTRAINT "marketingpublicationviews_marketingPublication_id_fkey" FOREIGN KEY ("marketingPublication_id") REFERENCES "marketingpublications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
