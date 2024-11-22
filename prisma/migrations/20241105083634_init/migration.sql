-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `telegramId` BIGINT UNSIGNED NOT NULL,
    `firstName` VARCHAR(128) NULL,
    `lastName` VARCHAR(128) NULL,
    `referralToken` VARCHAR(64) NOT NULL,
    `telegramData` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_telegramId_key`(`telegramId`),
    UNIQUE INDEX `User_referralToken_key`(`referralToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `type` VARCHAR(128) NOT NULL,
    `iteration` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `startAt` TIMESTAMP NOT NULL,
    `endAt` TIMESTAMP NOT NULL,
    `rewardType` VARCHAR(128) NOT NULL,
    `calcResult` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GamePrizePool` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `inputStart` DOUBLE NOT NULL,
    `inputEnd` DOUBLE NOT NULL,
    `prizePool` DOUBLE NOT NULL,
    `winnerRewardRatio` FLOAT NOT NULL,
    `participationReward` DOUBLE NOT NULL,
    `otherRewardRatio` DOUBLE NOT NULL,
    `winningResult` DOUBLE NULL,
    `diff` DOUBLE NULL,
    `secondToken` INTEGER UNSIGNED NULL,
    `GameId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `GamePrizePool_GameId_key`(`GameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `type` VARCHAR(128) NOT NULL,
    `shortDescription` VARCHAR(256) NULL,
    `longDescription` TEXT NULL,
    `startAt` TIMESTAMP NOT NULL,
    `endAt` TIMESTAMP NOT NULL,
    `duration` INTEGER UNSIGNED NULL,
    `location` VARCHAR(256) NULL,
    `attending_link` VARCHAR(256) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEvent` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,
    `firstName` VARCHAR(128) NOT NULL,
    `lastName` VARCHAR(128) NOT NULL,
    `university` VARCHAR(255) NULL,
    `major` VARCHAR(128) NULL,
    `UserId` INTEGER UNSIGNED NOT NULL,
    `EventId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGame` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER UNSIGNED NOT NULL,
    `GameId` INTEGER UNSIGNED NOT NULL,
    `reward` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `response` DOUBLE NOT NULL,
    `metaData` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserReferral` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `OwnerId` INTEGER UNSIGNED NOT NULL,
    `FriendId` INTEGER UNSIGNED NOT NULL,
    `reward` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserReferral_OwnerId_FriendId_key`(`OwnerId`, `FriendId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GamePrizePool` ADD CONSTRAINT `GamePrizePool_GameId_fkey` FOREIGN KEY (`GameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvent` ADD CONSTRAINT `UserEvent_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvent` ADD CONSTRAINT `UserEvent_EventId_fkey` FOREIGN KEY (`EventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGame` ADD CONSTRAINT `UserGame_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGame` ADD CONSTRAINT `UserGame_GameId_fkey` FOREIGN KEY (`GameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReferral` ADD CONSTRAINT `UserReferral_OwnerId_fkey` FOREIGN KEY (`OwnerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReferral` ADD CONSTRAINT `UserReferral_FriendId_fkey` FOREIGN KEY (`FriendId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
