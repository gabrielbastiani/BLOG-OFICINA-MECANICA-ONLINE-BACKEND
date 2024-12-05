-- DropForeignKey
ALTER TABLE "commentlikes" DROP CONSTRAINT "commentlikes_userBlog_id_fkey";

-- DropForeignKey
ALTER TABLE "postlikes" DROP CONSTRAINT "postlikes_userBlog_id_fkey";

-- AlterTable
ALTER TABLE "commentlikes" ALTER COLUMN "userBlog_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "postlikes" ALTER COLUMN "userBlog_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "postlikes" ADD CONSTRAINT "postlikes_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
