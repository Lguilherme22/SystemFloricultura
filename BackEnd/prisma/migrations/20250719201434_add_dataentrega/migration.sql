/*
  Warnings:

  - The primary key for the `Pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `criadoEm` on the `Pedido` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `dataEntrega` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioMax` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioMin` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "horarioMin" TEXT NOT NULL,
    "horarioMax" TEXT NOT NULL
);
INSERT INTO "new_Pedido" ("endereco", "id", "nome", "produto", "telefone") SELECT "endereco", "id", "nome", "produto", "telefone" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
