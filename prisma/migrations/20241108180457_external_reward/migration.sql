/*
  Warnings:

  - You are about to alter the column `startAt` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endAt` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `startAt` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endAt` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `startAt` TIMESTAMP NOT NULL,
    MODIFY `endAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Game` MODIFY `startAt` TIMESTAMP NOT NULL,
    MODIFY `endAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `lastLogin` TIMESTAMP NULL,
    ADD COLUMN `loginStreak` INTEGER UNSIGNED NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `ExternalReward` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `reward` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `name` VARCHAR(128) NOT NULL,
    `isActive` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserExternalReward` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER UNSIGNED NOT NULL,
    `ExternalRewardId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserExternalReward` ADD CONSTRAINT `UserExternalReward_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExternalReward` ADD CONSTRAINT `UserExternalReward_ExternalRewardId_fkey` FOREIGN KEY (`ExternalRewardId`) REFERENCES `ExternalReward`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
