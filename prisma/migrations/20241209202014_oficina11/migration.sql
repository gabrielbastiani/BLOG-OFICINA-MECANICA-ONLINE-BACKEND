/*
  Warnings:

  - You are about to drop the column `last_status_update` on the `marketingpublications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "last_status_update",
ADD COLUMN     "is_processing" BOOLEAN NOT NULL DEFAULT false;
