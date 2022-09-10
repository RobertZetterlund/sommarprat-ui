/*
  Warnings:

  - Added the required column `popularity` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "albumId" TEXT NOT NULL,
    "albumName" TEXT NOT NULL,
    "albumImg" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "artistName" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "dob" TEXT,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL PRIMARY KEY,
    "imageurl" TEXT NOT NULL,
    "episodeUrl" TEXT NOT NULL,
    "yearAired" INTEGER NOT NULL,
    "popularity" REAL NOT NULL
);
INSERT INTO "new_Episode" ("date", "dob", "episodeUrl", "imageurl", "playlistId", "title", "yearAired") SELECT "date", "dob", "episodeUrl", "imageurl", "playlistId", "title", "yearAired" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
