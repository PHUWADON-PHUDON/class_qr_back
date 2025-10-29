-- CreateTable
CREATE TABLE `lavel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lavel` INTEGER NOT NULL,
    `sublavel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentlavel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lavel_id` INTEGER NOT NULL,
    `studentid` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `studentlavel` ADD CONSTRAINT `studentlavel_lavel_id_fkey` FOREIGN KEY (`lavel_id`) REFERENCES `lavel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
