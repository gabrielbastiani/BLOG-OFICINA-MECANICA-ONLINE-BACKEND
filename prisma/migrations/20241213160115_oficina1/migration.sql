/*
  Warnings:

  - You are about to drop the column `userBlog_id` on the `commentlikes` table. All the data in the column will be lost.
  - You are about to drop the column `userBlog_id` on the `postlikes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "commentlikes" DROP CONSTRAINT "commentlikes_userBlog_id_fkey";

-- DropForeignKey
ALTER TABLE "postlikes" DROP CONSTRAINT "postlikes_userBlog_id_fkey";

-- DropIndex
DROP INDEX "commentlikes_comment_id_userBlog_id_key";

-- DropIndex
DROP INDEX "postlikes_post_id_userBlog_id_key";

-- AlterTable
ALTER TABLE "commentlikes" DROP COLUMN "userBlog_id",
ADD COLUMN     "ipAddress" VARCHAR(45);

-- AlterTable
ALTER TABLE "postlikes" DROP COLUMN "userBlog_id",
ADD COLUMN     "ipAddress" VARCHAR(45);
