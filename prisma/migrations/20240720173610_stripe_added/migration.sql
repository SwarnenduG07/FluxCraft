-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subcription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_key" ON "UserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_customer_id_key" ON "UserSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_subcription_id_key" ON "UserSubscription"("stripe_subcription_id");
