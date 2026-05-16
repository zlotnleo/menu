-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_MenuSection" ("id", "name") SELECT "id", "name" FROM "MenuSection";
DROP TABLE "MenuSection";
ALTER TABLE "new_MenuSection" RENAME TO "MenuSection";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
