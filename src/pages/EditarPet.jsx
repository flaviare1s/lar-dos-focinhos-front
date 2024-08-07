import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getPet, updatePet } from "../api/pets";
import toast from "react-hot-toast";
import { useEffect } from "react";

function EditarPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  function atualizarPet(data) {
    if (data.dataNasc == "") {
      data.dataNasc = null;
    }
    updatePet(id, data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/pets");
      })
      .catch(() => {
        navigate("/pets");
      });
  }

  function carregarPet() {
    getPet(id)
      .then((dados) => {
        reset(dados);
      })
      .catch(() => {
        navigate("/pets");
      });
  }

  useEffect(() => {
    carregarPet();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Novo pet</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">Preencha o nome!</small>
          )}
        </div>
        <div>
          <label htmlFor="raca">Raça</label>
          <input
            type="text"
            id="raca"
            className="form-control"
            {...register("raca", { required: true, maxLength: 20 })}
          />
          {errors.tipo && (
            <small className="text-danger">Preencha a raça!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <input
            type="date"
            id="dataNasc"
            className="form-control"
            {...register("dataNasc")}
          />
        </div>
    
        <Button variant="dark" className="mt-3" type="submit">
          Atualizar
        </Button>
      </form>
    </main>
  );
}

export default EditarPet;
