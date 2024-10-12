-- CreateTable
CREATE TABLE `dependencia` (
    `idDependency` VARCHAR(191) NOT NULL,
    `dependencyName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idDependency`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classroom` (
    `idClassroom` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `building` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `width` DECIMAL(10, 2) NOT NULL,
    `length` DECIMAL(10, 2) NOT NULL,
    `computerEquipment` INTEGER NOT NULL,
    `deskWithChair` INTEGER NOT NULL,
    `currentChairs` INTEGER NOT NULL,
    `currentTables` INTEGER NOT NULL,
    `maxChairsCapacity` INTEGER NOT NULL,
    `maxTablesCapacity` INTEGER NOT NULL,
    `lamps` INTEGER NOT NULL,
    `thermalLevel` VARCHAR(191) NOT NULL,
    `airConditioning` BOOLEAN NOT NULL,
    `Dependency_idDependency` VARCHAR(191) NULL,

    PRIMARY KEY (`idClassroom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `idTeacher` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `personalNumber` INTEGER NOT NULL,
    `antiquity` INTEGER NULL,
    `personalAccount` VARCHAR(191) NULL,
    `institutionalAccount` VARCHAR(191) NULL,
    `uvAdmissionDate` DATETIME(3) NULL,
    `birthdate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `teacher_personalNumber_key`(`personalNumber`),
    PRIMARY KEY (`idTeacher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classroom` ADD CONSTRAINT `classroom_Dependency_idDependency_fkey` FOREIGN KEY (`Dependency_idDependency`) REFERENCES `dependencia`(`idDependency`) ON DELETE SET NULL ON UPDATE CASCADE;
