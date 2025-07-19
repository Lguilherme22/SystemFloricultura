-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "produto" TEXT NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "horarioMin" TEXT NOT NULL,
    "horarioMax" TEXT NOT NULL
);
INSERT INTO "new_Pedido" ("dataEntrega", "endereco", "horarioMax", "horarioMin", "id", "nome", "produto", "telefone") SELECT "dataEntrega", "endereco", "horarioMax", "horarioMin", "id", "nome", "produto", "telefone" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
