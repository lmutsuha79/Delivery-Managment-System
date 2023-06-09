-- CreateTable
CREATE TABLE "DeliveryBoy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryBoy_phone_key" ON "DeliveryBoy"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryBoy_avatar_key" ON "DeliveryBoy"("avatar");
