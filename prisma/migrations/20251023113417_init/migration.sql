-- CreateTable
CREATE TABLE `subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lavel_id` INTEGER NOT NULL,
    `subjectname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_lavel_id_fkey` FOREIGN KEY (`lavel_id`) REFERENCES `lavel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
