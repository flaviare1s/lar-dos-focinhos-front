import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getCliente, updateCliente } from "../api/clientes";

function EditarCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  function atualizarCliente(data) {
    updateCliente(id, data)
      .then((resposta) => {
        //importei updateCliente
        toast.success(resposta.message);
        navigate("/clientes");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  //puxando id
  function carregarClientes() {
    getCliente(id)
      .then((dados) => {
        reset(dados);
      })
      .catch((err) => {
        navigate("/clientes");
      });
  }

  //usando use effect pra pegar cliente e carregar dados

  useEffect(() => {
    carregarClientes();
  }, []); //array vazio significa que vai executar carregarClientes só uma vez. use effect reage a mudanças de estado.

  return (
    <main className="mt-4 container">
      <h1>Editar Cliente</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarCliente)}>
      <div>
      <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true, maxLength: 200 })}
          />
          {errors.email && (
            <small className="text-danger">O email é inválido!</small>
          )}
      </div>
      <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            className="form-control"
            {...register("telefone", { required: true, maxLength: 200 })}
          />
          {errors.telefone && (
            <small className="text-danger">O telefone é inválido!</small>
          )}
        </div>

      <Button className="mt-3" type="submit">
          Atualizar
        </Button>
        
      </form>
    </main>
  );
}

export default EditarCliente;
