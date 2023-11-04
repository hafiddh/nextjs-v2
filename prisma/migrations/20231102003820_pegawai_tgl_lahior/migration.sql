/*
  Warnings:

  - You are about to drop the column `golongan` on the `pegawai` table. All the data in the column will be lost.
  - Added the required column `tgl_lahir` to the `Pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pegawai` DROP COLUMN `golongan`,
    ADD COLUMN `tgl_lahir` DATETIME(3) NOT NULL;
