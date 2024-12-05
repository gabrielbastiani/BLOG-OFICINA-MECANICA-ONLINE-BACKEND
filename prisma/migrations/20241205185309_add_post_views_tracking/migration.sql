-- AlterTable
ALTER TABLE "postlikes" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- CreateTable
CREATE TABLE "postviews" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "ipAddress" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "postviews_post_id_ipAddress_key" ON "postviews"("post_id", "ipAddress");

-- AddForeignKey
ALTER TABLE "postviews" ADD CONSTRAINT "postviews_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
