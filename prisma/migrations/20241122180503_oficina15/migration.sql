-- DropForeignKey
ALTER TABLE "category_on_posts" DROP CONSTRAINT "category_on_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "tag_on_posts" DROP CONSTRAINT "tag_on_posts_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "post_like" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
