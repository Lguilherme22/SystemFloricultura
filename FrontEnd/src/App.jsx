import "./App.css";
import Logo from "../public/logo.png";
import {useState} from "react";
import api from "./services/api";


function App() {
  
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [data, setData] = useState("");
  const [produto, setProduto] = useState("");
  const [horaMin, setHoraMin] = useState("");
  const [horaMax, setHoraMax] = useState("");


  const validaNumero = (text) => {
       return text.replace(/[^0-9]/g, "");
  }

  const enviar = async (e) => {

e.preventDefault();

try {
  await api.post("/pedidos", {
    nome,
    telefone: numero,
    endereco: "Endereço não implementado",
    produto,
    dataEntrega: data,
    horarioMin: horaMin,
    horarioMax: horaMax,
  });
  alert("Pedido enviado com sucesso!");
  }catch(error) {
    console.error("Erro ao enviar pedido:", error);
    alert("Erro ao enviar pedido. Tente novamente.");
  }

  limpar()

  }






const limpar = (e) => {
setData('')
setHoraMax('')
setHoraMin('')
setNome('')
setProduto('')
setNumero('')

};

  return (
    <div className="container">
    
      {/* <h1>LAÇOS E FLORES </h1> */}
      <div className="alinha-form">
        <form onSubmit={enviar}>
          <label>
            <span>Nome do cliente:</span>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value) } />
          </label>

          <label>
            <span>Numero do cliente:</span>
            <input type="tel" placeholder="(__) __ _____-____" value={numero} onChange={(e) => setNumero(validaNumero(e.target.value)) } />
          </label>

          <label>
            <span>Data:</span> 
            <input type="date" value={data} onChange={(e) => setData(e.target.value) } />
          </label>

          <label>
            <span>Produto:</span>
            <input type="text" value={produto} onChange={(e) => setProduto(e.target.value) } />
          </label>

          <div>
            <h4>Horário de entrega:</h4>
            <div className="alinha-inputs">
              <label>
                <span>Min:</span>
                <input type="time" value={horaMin} onChange={(e) => setHoraMin(e.target.value) }/>
              </label>

              <label>
                <span>Max:</span>
                <input type="time" value={horaMax} onChange={(e) => setHoraMax(e.target.value) } />
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
