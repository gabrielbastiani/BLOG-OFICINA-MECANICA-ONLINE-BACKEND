/*
  Warnings:

  - You are about to drop the column `author` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `slug_author` on the `comments` table. All the data in the column will be lost.
  - Added the required column `userBlog_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author",
DROP COLUMN "slug_author",
ADD COLUMN     "userBlog_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
