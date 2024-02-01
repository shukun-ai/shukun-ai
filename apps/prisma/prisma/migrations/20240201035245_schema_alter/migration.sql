/*
  Warnings:

  - You are about to drop the column `dbHost` on the `schemas` table. All the data in the column will be lost.
  - You are about to drop the column `dbName` on the `schemas` table. All the data in the column will be lost.
  - You are about to drop the column `dbPassword` on the `schemas` table. All the data in the column will be lost.
  - You are about to drop the column `dbPort` on the `schemas` table. All the data in the column will be lost.
  - You are about to drop the column `dbSchema` on the `schemas` table. All the data in the column will be lost.
  - You are about to drop the column `dbType` on the `schemas` table. All the data in the column will be lost.
  - You are about to drop the column `dbUser` on the `schemas` table. All the data in the column will be lost.
  - Added the required column `connection` to the `schemas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schemas" DROP COLUMN "dbHost",
DROP COLUMN "dbName",
DROP COLUMN "dbPassword",
DROP COLUMN "dbPort",
DROP COLUMN "dbSchema",
DROP COLUMN "dbType",
DROP COLUMN "dbUser",
ADD COLUMN     "connection" JSONB NOT NULL;
