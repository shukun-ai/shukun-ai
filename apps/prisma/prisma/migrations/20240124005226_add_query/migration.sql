-- CreateTable
CREATE TABLE "queries" (
    "queryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "queries_pkey" PRIMARY KEY ("queryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "queries_name_key" ON "queries"("name");
