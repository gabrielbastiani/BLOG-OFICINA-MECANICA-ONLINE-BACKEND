/*
  Warnings:

  - Added the required column `type` to the `notificationuserblogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `notificationusers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notificationuserblogs" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notificationusers" ADD COLUMN     "type" TEXT NOT NULL;
