-- AlterTable
ALTER TABLE "marketingpublications" ADD COLUMN     "email_sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_status_update" TIMESTAMP(3);
