-- CreateTable
CREATE TABLE "MenuSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cocktail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "garnish" TEXT,
    "preparation" TEXT NOT NULL,
    "menuSectionId" INTEGER,
    CONSTRAINT "Cocktail_menuSectionId_fkey" FOREIGN KEY ("menuSectionId") REFERENCES "MenuSection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cocktail" ("garnish", "id", "name", "preparation") SELECT "garnish", "id", "name", "preparation" FROM "Cocktail";
DROP TABLE "Cocktail";
ALTER TABLE "new_Cocktail" RENAME TO "Cocktail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
