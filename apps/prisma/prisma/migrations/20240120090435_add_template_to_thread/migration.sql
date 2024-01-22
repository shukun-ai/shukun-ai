/*
  Warnings:

  - Added the required column `templateId` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "templateId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;
