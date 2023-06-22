-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeliveryBoy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "profiteForEveryDelivery" INTEGER NOT NULL DEFAULT 60,
    "unpaid" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_DeliveryBoy" ("avatar", "createdAt", "id", "name", "phone", "profiteForEveryDelivery", "updatedAt") SELECT "avatar", "createdAt", "id", "name", "phone", "profiteForEveryDelivery", "updatedAt" FROM "DeliveryBoy";
DROP TABLE "DeliveryBoy";
ALTER TABLE "new_DeliveryBoy" RENAME TO "DeliveryBoy";
CREATE UNIQUE INDEX "DeliveryBoy_phone_key" ON "DeliveryBoy"("phone");
CREATE UNIQUE INDEX "DeliveryBoy_avatar_key" ON "DeliveryBoy"("avatar");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
