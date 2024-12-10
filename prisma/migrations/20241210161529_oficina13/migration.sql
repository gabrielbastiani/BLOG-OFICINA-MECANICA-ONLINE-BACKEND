/*
  Warnings:

  - The `popup_behavior` column on the `marketingpublications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `popup_position` column on the `marketingpublications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "popup_behavior",
ADD COLUMN     "popup_behavior" JSONB,
DROP COLUMN "popup_position",
ADD COLUMN     "popup_position" JSONB;
