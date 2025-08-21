/*
  Warnings:

  - The primary key for the `Leaderboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `highscore` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "points",
ADD COLUMN     "highscore" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("userId");
