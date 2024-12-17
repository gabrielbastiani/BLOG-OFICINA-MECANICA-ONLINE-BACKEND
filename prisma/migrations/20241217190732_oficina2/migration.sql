/*
  Warnings:

  - You are about to drop the column `configurationMarketingConfiguration_id` on the `configurationsmarketingonpublications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[marketingPublication_id,configurationMarketingType_id]` on the table `configurationsmarketingonpublications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `configurationMarketingType_id` to the `configurationsmarketingonpublications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "configurationsmarketingonpublications" DROP CONSTRAINT "configurationsmarketingonpublications_configurationMarketi_fkey";

-- DropIndex
DROP INDEX "configurationsmarketingonpublications_marketingPublication__key";

-- AlterTable
ALTER TABLE "configurationsmarketingonpublications" DROP COLUMN "configurationMarketingConfiguration_id",
ADD COLUMN     "configurationMarketingType_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "configurationsmarketingonpublications_marketingPublication__key" ON "configurationsmarketingonpublications"("marketingPublication_id", "configurationMarketingType_id");

-- AddForeignKey
ALTER TABLE "configurationsmarketingonpublications" ADD CONSTRAINT "configurationsmarketingonpublications_configurationMarketi_fkey" FOREIGN KEY ("configurationMarketingType_id") REFERENCES "configurationmarketingtypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
