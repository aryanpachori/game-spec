/*
  Warnings:

  - You are about to drop the column `Dimensions` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Room` table. All the data in the column will be lost.
  - Added the required column `dimensions` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "Dimensions",
DROP COLUMN "name",
ADD COLUMN     "dimensions" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
