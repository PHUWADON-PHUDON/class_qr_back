-- CreateTable
CREATE TABLE `checkstatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentcheck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lavel_id` INTEGER NOT NULL,
    `subjectid` INTEGER NOT NULL,
    `datecountid` INTEGER NOT NULL,
    `studentid` INTEGER NOT NULL,
    `checkstatusid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `studentcheck` ADD CONSTRAINT `studentcheck_lavel_id_fkey` FOREIGN KEY (`lavel_id`) REFERENCES `lavel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentcheck` ADD CONSTRAINT `studentcheck_subjectid_fkey` FOREIGN KEY (`subjectid`) REFERENCES `subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentcheck` ADD CONSTRAINT `studentcheck_datecountid_fkey` FOREIGN KEY (`datecountid`) REFERENCES `datecount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentcheck` ADD CONSTRAINT `studentcheck_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `studentlavel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentcheck` ADD CONSTRAINT `studentcheck_checkstatusid_fkey` FOREIGN KEY (`checkstatusid`) REFERENCES `checkstatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
