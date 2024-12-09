/*
  Warnings:

  - The `popup_conditions` column on the `marketingpublications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "popup_conditions",
ADD COLUMN     "popup_conditions" JSONB;
