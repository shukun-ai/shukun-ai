/*
  Warnings:

  - You are about to drop the column `text` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `threadTitle` on the `threads` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "text",
DROP COLUMN "type",
ADD COLUMN     "metadata" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "threadTitle",
ADD COLUMN     "title" TEXT NOT NULL;
