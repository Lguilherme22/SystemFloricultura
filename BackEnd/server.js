import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/default.js';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Criar novo pedido
app.post("/pedidos", async (req, res) => {
  const { nome, telefone, endereco, produto, dataEntrega, horarioMin, horarioMax } = req.body;

  if (!dataEntrega) {
    return res.status(400).json({ error: "Campo dataEntrega é obrigatório." });
  }

  try {
    const novoPedido = await prisma.pedido.create({
      data: {
        nome,
        telefone,
        endereco,
        produto,
        dataEntrega: new Date(dataEntrega),
        horarioMin,
        horarioMax,
      },
    });
    res.status(201).json(novoPedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

// Atualizar pedido existente
app.put("/pedidos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, endereco, produto, dataEntrega, horarioMin, horarioMax } = req.body;

  if (!dataEntrega) {
    return res.status(400).json({ error: "Campo dataEntrega é obrigatório." });
  }

  try {
    const pedidoAtualizado = await prisma.pedido.update({
      where: { id: Number(id) },
      data: {
        nome,
        telefone,
        endereco,
        produto,
        dataEntrega: new Date(dataEntrega),
        horarioMin,
        horarioMax,
      },
    });
    res.json(pedidoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
});

// Buscar todos os pedidos
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany();
    res.json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

// Deletar pedido por ID
app.delete("/pedidos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pedido.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
