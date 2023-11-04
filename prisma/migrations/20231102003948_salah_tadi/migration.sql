/*
  Warnings:

  - You are about to drop the column `eselon` on the `pegawai` table. All the data in the column will be lost.
  - Added the required column `golongan` to the `Pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pegawai` DROP COLUMN `eselon`,
    ADD COLUMN `golongan` VARCHAR(191) NOT NULL;
