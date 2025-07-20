import "./StatusPedidos.css";
import api from "../services/api";
import { useState, useEffect } from "react";

const StatusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await api.get("/pedidos");
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    }

    fetchPedidos();
  }, []);
  return (
    <div className="container1">
      {pedidos.map((pedido) => (
        <div className="card" key={pedido.id}>
          <p>
            <strong>Nome do cliente: </strong>
            {pedido.nome}
          </p>
          <p>
            <strong>Telefone:</strong> {pedido.telefone}
          </p>
          <p>
            <strong>Produto: </strong>
            {pedido.produto}
          </p>
          <p>
            <strong>Horário min: </strong>
            {pedido.horarioMin}
          </p>
          <p>
            <strong>Horário Max: </strong>
            {pedido.horarioMax}
          </p>
        </div>
      ))}

      <h1>ok</h1>
    </div>
  );
};

export default StatusPedidos;
