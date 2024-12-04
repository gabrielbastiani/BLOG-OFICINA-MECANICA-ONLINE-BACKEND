-- AlterTable
ALTER TABLE "commentlikes" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "comment_dislike" INTEGER NOT NULL DEFAULT 0;
