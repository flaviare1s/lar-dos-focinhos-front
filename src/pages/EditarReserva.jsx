import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getReserva, updateReserva } from "../api/reservas";

function EditarReserva() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  // Função para editar a Reserva
  function atualizarReserva(data) {
    updateReserva(id, data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/reservas");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  // Função para carregar a Reserva
  function carregarReserva() {
    getReserva(id)
      .then((dados) => {
        reset(dados);
      })
      .catch(() => {
        navigate("/reservas");
      });
  }

  useEffect(() => {
    carregarReserva();
  },[]); 

  return (
    <main className="mt-4 container">
      <h1>Editar Reserva</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarReserva)}>
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
          <select
            id="tipoAcomodacao"
            className="form-control"
            {...register("tipoAcomodacao", { required: true })}
          >
            <option value="">Selecione o tipo de acomodação</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Standard">Standard</option>
          </select>
          {errors.tipoAcomodacao && (
            <small className="text-danger">O tipo de acomodação é obrigatório!</small>
          )}
        </div>
        <Button variant="dark" className="mt-3" type="submit">
          Atualizar
        </Button>
      </form>
    </main>
  );
}

export default EditarReserva;
