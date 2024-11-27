/*
  Warnings:

  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_userBlog_id_fkey";

-- DropTable
DROP TABLE "CommentLike";

-- CreateTable
CREATE TABLE "commentlikes" (
    "id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "userBlog_id" TEXT NOT NULL,
    "isLike" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "commentlikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
