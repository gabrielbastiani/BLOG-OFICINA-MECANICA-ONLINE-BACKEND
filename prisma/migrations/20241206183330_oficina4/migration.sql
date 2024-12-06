-- AlterTable
ALTER TABLE "marketingpublications" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "redirect_url" DROP NOT NULL,
ALTER COLUMN "clicks" DROP NOT NULL;
