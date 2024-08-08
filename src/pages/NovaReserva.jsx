import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReserva } from "../api/reservas"; 
import {getClientes} from "../api/clientes";
import { getPets } from "../api/pets";
import toast from "react-hot-toast";

function NovaReserva() {
  const [clientes, setClientes] = useState([]);
  const [pets, setPets] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const clientesData = await getClientes(); // Obtenha a lista de clientes
        const petsData = await getPets(); // Obtenha a lista de pets
        setClientes(clientesData);
        setPets(petsData);
      } catch (error) {
        toast.error("Erro ao carregar dados.");
      }
    }
    carregarDados();
  }, []);

  function criarReserva(data) {
    addReserva(data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/reservas");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <main className="mt-4 container">
      <h1>Nova Reserva</h1>
      <hr />
      <form onSubmit={handleSubmit(criarReserva)}>
        <div>
          <label htmlFor="dataInicio">Data de Início</label>
          <input
            type="date"
            id="dataInicio"
            className="form-control"
            {...register("dataInicio", { required: true })}
          />
          {errors.dataInicio && (
            <small className="text-danger">A data de início é obrigatória!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataTermino">Data de Término</label>
          <input
            type="date"
            id="dataTermino"
            className="form-control"
            {...register("dataTermino", { required: true })}
          />
          {errors.dataTermino && (
            <small className="text-danger">A data de término é obrigatória!</small>
          )}
        </div>
        <div>
          <label htmlFor="statusReserva">Status</label>
          <input
            type="text"
            id="statusReserva"
            className="form-control"
            {...register("statusReserva", { required: true })}
          />
          {errors.statusReserva && (
            <small className="text-danger">O status é obrigatório!</small>
          )}
        </div>
        <div>
          <label htmlFor="tipoAcomodacao">Tipo de Acomodação</label>
          <Form.Select
            id="tipoAcomodacao"
            className="form-control"
            {...register("tipoAcomodacao", { required: true })}
          >
            <option value="">Selecione o tipo de acomodação</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Standard">Standard</option>
          </Form.Select>
          {errors.tipoAcomodacao && (
            <small className="text-danger">O tipo de acomodação é obrigatório!</small>
          )}
        </div>
        <div>
          <label htmlFor="clienteId">Cliente</label>
          <Form.Select
            id="clienteId"
            className="form-control mt-2"
            {...register("clienteId", { required: true, valueAsNumber: true })}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </Form.Select>
          {errors.clienteId && (
            <small className="text-danger">Selecione um cliente!</small>
          )}
        </div>
        <div>
          <label htmlFor="petId">Pet</label>
          <Form.Select
            id="petId"
            className="form-control mt-2"
            {...register("petId", { required: true, valueAsNumber: true })}
          >
            <option value="">Selecione um pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.nome}
              </option>
            ))}
          </Form.Select>
          {errors.petId && (
            <small className="text-danger">Selecione um pet!</small>
          )}
        </div>
        <Button variant="dark" className="mt-3" type="submit">
          Adicionar Reserva
        </Button>
      </form>
      <hr />
    </main>
  );
}

export default NovaReserva;
