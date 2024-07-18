-- CreateTable
CREATE TABLE "userAPI" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAPI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAPI_userId_key" ON "userAPI"("userId");
