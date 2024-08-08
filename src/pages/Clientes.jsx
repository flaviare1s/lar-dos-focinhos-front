import { deleteCliente, getClientes } from "../api/clientes"
import {useEffect, useState} from "react"
import Loader from "../components/Loader";
import {Button, Table, ButtonGroup} from "react-bootstrap";
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
    <hr />
    {clientes ? (
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th className="d-none d-md-table-cell"> E-mail</th>
            <th className="d-none d-sm-table-cell" >Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td className="d-none d-md-table-cell">{cliente.email}</td>
                <td  className="d-none d-sm-table-cell" >{cliente.telefone}</td>
                <td>
                <ButtonGroup>
                      <Button variant="outline-dark" as={Link} to={`/clientes/editar/${cliente.id}`}>
                        <span className="material-symbols-outlined">edit</span></Button>
                        <Button variant="outline-success" as={Link} to={`/clientes/${cliente.id}/reservas`} >Reservas</Button>
                      <Button variant="outline-danger"  onClick={() => deletarCliente(cliente.id)}>
                      <span className="material-symbols-outlined">delete</span></Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ) : (
      <Loader />
    )}
        <Button as={Link} variant="dark" to="/clientes/novo">
      Adicionar Cliente
    </Button>

  </main>
);
}

export default Clientes;
