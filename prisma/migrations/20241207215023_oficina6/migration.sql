-- AlterTable
ALTER TABLE "marketingpublications" ADD COLUMN     "is_popup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "popup_behavior" VARCHAR(100),
ADD COLUMN     "popup_conditions" VARCHAR(1000),
ADD COLUMN     "popup_position" VARCHAR(50);
