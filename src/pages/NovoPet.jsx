import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getClientes } from "../api/clientes";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { addPet } from "../api/pets";

function NovoPet() {
  const [clientes, setClientes] = useState(null)

  useEffect(() => {
    getClientes().then((dados) => {
      setClientes(dados)
    })
  }, [])

  function salvarPet(data) {
    if (data.dataNasc == '') {
      data.dataNasc = null
    }
    addPet(data).then((response) => {
      toast.success(response.message)
      navigate("/pets")
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <main className="mt-4 container">
      <h1>Novo pet</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarPet)}>
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
          <label htmlFor="tipo">Raça</label>
          <input
            type="text"
            id="raca"
            className="form-control"
            {...register("raca", { required: true, maxLength: 20 })}
          />
          {errors.raca && (
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
        <div>
          <select id="clienteId" className="form-select mt-2" {...register("clienteId", { required: true, valueAsNumber: true })} aria-label="Default select example">
            <option value="">Selecione um cliente</option>
            {clientes && clientes.map((cliente) => {
              return (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              )
            })}
          </select>
          {errors.clienteId && (
            <small className="text-danger">Selecione um cliente!</small>
          )}
        </div>
        <Button variant="dark" className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoPet;
