/*
  Warnings:

  - You are about to drop the column `dbUrl` on the `schemas` table. All the data in the column will be lost.
  - Added the required column `dbHost` to the `schemas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dbName` to the `schemas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dbPassword` to the `schemas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dbPort` to the `schemas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dbUser` to the `schemas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "schemas_dbUrl_key";

-- AlterTable
ALTER TABLE "schemas" DROP COLUMN "dbUrl",
ADD COLUMN     "dbHost" TEXT NOT NULL,
ADD COLUMN     "dbName" TEXT NOT NULL,
ADD COLUMN     "dbPassword" TEXT NOT NULL,
ADD COLUMN     "dbPort" INTEGER NOT NULL,
ADD COLUMN     "dbSchema" TEXT,
ADD COLUMN     "dbUser" TEXT NOT NULL;
