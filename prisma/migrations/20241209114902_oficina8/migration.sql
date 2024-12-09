-- DropForeignKey
ALTER TABLE "marketingpublicationviews" DROP CONSTRAINT "marketingpublicationviews_marketingPublication_id_fkey";

-- DropForeignKey
ALTER TABLE "postviews" DROP CONSTRAINT "postviews_post_id_fkey";

-- AlterTable
ALTER TABLE "marketingpublicationviews" ALTER COLUMN "marketingPublication_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "postviews" ALTER COLUMN "post_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "postviews" ADD CONSTRAINT "postviews_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketingpublicationviews" ADD CONSTRAINT "marketingpublicationviews_marketingPublication_id_fkey" FOREIGN KEY ("marketingPublication_id") REFERENCES "marketingpublications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
