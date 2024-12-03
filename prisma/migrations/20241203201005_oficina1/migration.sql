-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userBlog_id_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "status" SET DEFAULT 'Pendente';

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
