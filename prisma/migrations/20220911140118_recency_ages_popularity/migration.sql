-- CreateTable
CREATE TABLE "Recency" (
    "year" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Age" (
    "age" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Popularity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "count" REAL NOT NULL
);
