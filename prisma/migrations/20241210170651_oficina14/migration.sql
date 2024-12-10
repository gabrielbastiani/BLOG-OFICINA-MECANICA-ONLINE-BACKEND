/*
  Warnings:

  - The `local_site` column on the `marketingpublications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "local_site",
ADD COLUMN     "local_site" JSONB;
