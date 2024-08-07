import { deleteCliente, getClientes } from "../api/clientes"
import {useEffect, useState} from "react"
import Loader from "../components/Loader";
import {Button, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Clientes(){
// UseEffect para carregarClientes
const [clientes, setClientes] = useState(null); // Este é um estado que guarda os clientes, por essa razão ele deve iniciar vazio para não dar problema.

//Função carregarClientes 
function carregarClientes() {
  getClientes().then((dados) => {
    setClientes(dados);
  });
}

//Agora, vamos usar o useEffect, para renderização de Clientes
useEffect(() => {
  carregarClientes();
}, []);

// Trabalhando com a função de deletarCliente
function deletarCliente(id) {
  const deletar = confirm("Tem certeza que deseja excluir?");
  if (deletar){
    deleteCliente(id)
    .then((resposta) =>{
      toast.success(resposta.message);
      carregarClientes();
    })
  }
}


//Lógica: 
// Neste return, vamos trabalhar primeiro com a construção da minha tabela, que renderiza a lista de clientes.
// Também vou trabalhar com a lógica de, se existe um clientes, ele irá renderizar, com ternário.


return (
  <main className="mt-4 container">
    <h1>Clientes</h1>
    <Button as={Link} to="/clientes/novo">
      Adicionar Cliente
    </Button>
    <hr />
    {clientes ? (
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deletarCliente(cliente.id)}>Excluir</Button>
                  <Button size="sm" as={Link} to={`/clientes/editar/${cliente.id}`}>Editar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ) : (
      <Loader />
    )}
  </main>
);
}

export default Clientes;
