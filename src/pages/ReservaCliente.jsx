import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getClienteReservas } from "../api/clientes";
import Loader from "../components/Loader"; // Adicionei o import para o Loader

function ReservaCliente() {
  const [reservas, setReservas] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionei estado para carregamento
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getClienteReservas(id)
        .then((dados) => {
          setReservas(dados);
        })
        .finally(() => {
          setLoading(false); // Define o estado de carregamento como false após a resposta
        });
    }
  }, [id]);

  return (
    <main className="mt-4 container">
      <h1>Reservas</h1>
      <hr />
      {loading ? (
        <Loader /> // Mostra um Loader enquanto os dados estão sendo carregados
      ) : reservas && reservas.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Data de Início</th>
              <th className="d-none d-md-table-cell">Data de Término</th>
              <th className="d-none d-sm-table-cell">Status</th>
              <th className="d-none d-lg-table-cell">Tipo de Acomodação</th>
              <th>Pet</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.cliente.nomeCliente}</td>
                <td className="d-none d-md-table-cell">{reserva.dataInicio}</td>
                <td className="d-none d-md-table-cell">{reserva.dataTermino}</td>
                <td className="d-none d-sm-table-cell">{reserva.statusReserva}</td>
                <td className="d-none d-lg-table-cell">{reserva.tipoAcomodacao}</td>
                <td>{reserva.pet.nomePet}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Não existem reservas para este cliente!</p>
      )}

      <Button as={Link} variant="dark" to="/clientes/">
        Voltar
      </Button>
      <hr />
    </main>
  );
}

export default ReservaCliente;
