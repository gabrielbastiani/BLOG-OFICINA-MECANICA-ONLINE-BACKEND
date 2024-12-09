/*
  Warnings:

  - You are about to drop the column `publish_at` on the `marketingpublications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "publish_at",
ADD COLUMN     "publish_at_end" TIMESTAMP(3),
ADD COLUMN     "publish_at_start" TIMESTAMP(3);
