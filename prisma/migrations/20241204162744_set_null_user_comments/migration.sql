-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userBlog_id_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "userBlog_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
