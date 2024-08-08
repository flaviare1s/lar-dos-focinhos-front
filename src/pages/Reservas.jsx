import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteReserva, getReservas } from "../api/reservas";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Reservas() {
  const [reservas, setReservas] = useState(null);

  function carregarReservas() {
    getReservas().then((dados) => {
      setReservas(dados);
    });
  }

  function deletarReserva(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteReserva(id).then((resposta) => {
        toast.success(resposta.message);
        carregarReservas();
      })
    }
  }


  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <main className="mt-4 container ">
      <h1>Reservas</h1>
      <hr />
      {reservas ? (
        <Table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Data de Início</th>
              <th className="d-none d-md-table-cell">Data de Término</th>
              <th className="d-none d-sm-table-cell">Status</th>
              <th className="d-none d-lg-table-cell">Tipo de Acomodação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => {
              return (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.cliente.nome}</td>
                  <td className="d-none d-md-table-cell">{reserva.dataInicio}</td>
                  <td className="d-none d-md-table-cell">{reserva.dataTermino}</td>
                  <td className="d-none d-sm-table-cell">{reserva.statusReserva}</td>
                  <td className="d-none d-lg-table-cell">{reserva.tipoAcomodacao}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="outline-dark" as={Link} to={`/reservas/editar/${reserva.id}`}>
                        <span className="material-symbols-outlined">edit</span></Button>
                      <Button variant="outline-danger"  onClick={() => deletarReserva(reserva.id)}>
                      <span className="material-symbols-outlined">delete</span></Button>
                  </ButtonGroup>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}

      <Button as={Link} variant="dark" to="/reservas/novo">
        Adicionar reserva
      </Button>
      <hr />
    </main>
  );
}

export default Reservas;
