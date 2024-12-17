/*
  Warnings:

  - You are about to drop the column `description` on the `configurationmarketingconfigurations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configurationmarketingconfigurations" DROP COLUMN "description",
ADD COLUMN     "description_value" TEXT;
