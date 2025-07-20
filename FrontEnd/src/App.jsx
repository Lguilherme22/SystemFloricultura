import "./App.css";
import Logo from "../public/logo.png";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [data, setData] = useState("");
  const [produto, setProduto] = useState([]);
  const [horaMin, setHoraMin] = useState("");
  const [horaMax, setHoraMax] = useState("");
  const [produtoAtual, setProdutoAtual] = useState("");
  const [number, setnumber] = useState(0)

  const validaNumero = (text) => {
    return text.replace(/[^0-9]/g, "");
  };

  const adicionarProduto = (e) => {
    if (e) {
      e.preventDefault();
    }

setnumber(1)


    if (produtoAtual.trim() !== "") {
      setProduto((prev) => [...prev, produtoAtual.trim()]);
      setProdutoAtual("");
    }
  };

  const enviar = async (e) => {
    e.preventDefault();

if (horaMin>horaMax){
alert("O horário mínimo não pode ser maior que o horário máximo")
return;

}


    let produtosubmit = produto;
    if (produtoAtual.trim() !== "") {
      produtosubmit = [...produto, produtoAtual.trim()];
      
    }


    try {
      await api.post("/pedidos", {
        nome,
        telefone: numero,
        endereco: "Endereço não implementado",
        produto: produtosubmit.join(", "),
        dataEntrega: data,
        horarioMin: horaMin,
        horarioMax: horaMax,
      });
      alert("Pedido enviado com sucesso!");
      limpar();
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert("Erro ao enviar pedido. Tente novamente.");
    }
  };

  const limpar = () => {
    setData("");
    setHoraMax("");
    setHoraMin("");
    setNome("");
    setProduto([]);
    setNumero("");
    setnumber(0)
  };

  return (
    <div className="container">
      {/* <h1>LAÇOS E FLORES </h1> */}
      <div className="alinha-form">
        <form onSubmit={enviar}>
          <label>
            <span>Nome do cliente:</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Numero do cliente:</span>
            <input
              type="tel"
              placeholder="(__) __ _____-____"
              value={numero}
              onChange={(e) => setNumero(validaNumero(e.target.value))}
            />
          </label>

          <label>
            <span>Data:</span>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            required
            />
          </label>

          <label>
            <span>Produtos:</span>
            <div className="alinha-produto">
              <input
                type="text"
                placeholder="Digite um produto"
                value={produtoAtual}
                onChange={(e) => setProdutoAtual(e.target.value)}
                required={produto.length === 0}
              />
              <button className="add-produto" onClick={adicionarProduto}>
                +
              </button>
            </div>
          </label>


<div className="produtos">
   
              {produto.map((item, index) => (
                <div className="produto" key={index}>{item}</div>
              ))}
           
</div>



          

          <div>
            <h4>Horário de entrega:</h4>
            <div className="alinha-inputs">
              <label>
                <span>Min:</span>
                <input
                  type="time"
                  value={horaMin}
                  onChange={(e) => setHoraMin(e.target.value)}
                  required
                />
              </label>

              <label>
                <span>Max:</span>
                <input
                  type="time"
                  value={horaMax}
                  onChange={(e) => setHoraMax(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <button type="submit">Enviar pedido</button>
        </form>
      </div>






      <div className="decoration">
        <div className="layer">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
      </div>
    </div>

    /*  */
  );
}

export default App;
