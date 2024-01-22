/*
  Warnings:

  - Added the required column `tables` to the `schemas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schemas" ADD COLUMN     "tables" JSONB NOT NULL;
