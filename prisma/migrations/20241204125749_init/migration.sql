-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `campFavorito` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfil` (
    `nomeUsuario` VARCHAR(191) NOT NULL,
    `FotoPerfil` LONGBLOB NULL,
    `idUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Perfil_idUsuario_key`(`idUsuario`),
    PRIMARY KEY (`nomeUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Noticia` (
    `idNoticia` INTEGER NOT NULL AUTO_INCREMENT,
    `imagemNoticia` LONGBLOB NULL,
    `localSite` VARCHAR(191) NOT NULL,
    `dataNoticia` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idNoticia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peneira` (
    `idPeneira` INTEGER NOT NULL AUTO_INCREMENT,
    `docNecessario` VARCHAR(191) NOT NULL,
    `itens` VARCHAR(191) NOT NULL,
    `faixaEtaria` INTEGER NOT NULL,
    `localPeneiras` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPeneira`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendario` (
    `jogos` VARCHAR(191) NOT NULL,
    `dataJogo` DATETIME(3) NOT NULL,
    `nomeTime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jogos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campeonato` (
    `nomeCamp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nomeCamp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jogador` (
    `idJogador` INTEGER NOT NULL AUTO_INCREMENT,
    `posicao` VARCHAR(191) NOT NULL,
    `dataNasc` DATETIME(3) NOT NULL,
    `altura` DOUBLE NOT NULL,
    `peso` DOUBLE NOT NULL,

    PRIMARY KEY (`idJogador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Time` (
    `nomeTime` VARCHAR(191) NOT NULL,
    `tecnico` VARCHAR(191) NOT NULL,
    `titulos` VARCHAR(191) NOT NULL,
    `estadio` VARCHAR(191) NOT NULL,
    `idJogador` INTEGER NULL,
    `nomeCamp` VARCHAR(191) NULL,

    PRIMARY KEY (`nomeTime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time` ADD CONSTRAINT `Time_idJogador_fkey` FOREIGN KEY (`idJogador`) REFERENCES `Jogador`(`idJogador`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time` ADD CONSTRAINT `Time_nomeCamp_fkey` FOREIGN KEY (`nomeCamp`) REFERENCES `Campeonato`(`nomeCamp`) ON DELETE SET NULL ON UPDATE CASCADE;
