/*
  Warnings:

  - You are about to drop the column `Money` on the `Order` table. All the data in the column will be lost.
  - Added the required column `money` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "customerName" TEXT,
    "moreInfo" TEXT,
    "pickUpLocation" TEXT NOT NULL,
    "deliveryLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deliveredAt" DATETIME NOT NULL,
    "money" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending Pickup',
    "deliveryBoyId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    CONSTRAINT "Order_deliveryBoyId_fkey" FOREIGN KEY ("deliveryBoyId") REFERENCES "DeliveryBoy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "customerName", "deliveredAt", "deliveryBoyId", "deliveryLocation", "id", "moreInfo", "phoneNumber", "pickUpLocation", "sessionId", "status", "updatedAt") SELECT "createdAt", "customerName", "deliveredAt", "deliveryBoyId", "deliveryLocation", "id", "moreInfo", "phoneNumber", "pickUpLocation", "sessionId", "status", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
