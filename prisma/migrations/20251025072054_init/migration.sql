-- CreateTable
CREATE TABLE `datecount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectid` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `datecount` ADD CONSTRAINT `datecount_subjectid_fkey` FOREIGN KEY (`subjectid`) REFERENCES `subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
