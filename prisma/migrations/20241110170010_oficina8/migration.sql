/*
  Warnings:

  - You are about to drop the column `nivel` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "nivel",
DROP COLUMN "order",
ALTER COLUMN "name_category" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
