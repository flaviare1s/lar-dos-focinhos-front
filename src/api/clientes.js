import axios from 'axios';

// -------- CRUD DE CLIENTES --------

// 1. GET 

export async function getClientes(){
    const response = await axios.get("http://localhost:3001/clientes");
    //dentro de data está o JSON de resposta do back-end
    return response.data;
}


// 2. PUT 
// Em PUT, vou começar a trabalhar com "data".

export async function addCliente(data){
    const response = await axios.post("http://localhost:3001/clientes", data);
    return response.data;
}
// 3. DELETE
export async function deleteCliente(id){
    const response = await axios.delete(`http://localhost:3001/clientes/${id}`);
    return response.data; //retorna deletado com sucesso, to puxando isso de data
}

//3. EDITAR CLIENTE (Apenas 1 cliente, por isso ID)
export async function getCliente(id){ //peguei um cliente específico
    const response = await axios.get(`http://localhost:3001/clientes/${id}`)
    // os dados do cliente vao estar dentro de response.data
    return response.data; //o objeto la do insomnia vai estarem data
}

//metodo de atualizar, para que renderize com as novas atualizações
export async function updateCliente(id, data){
    const response = await axios.put(`http://localhost:3001/clientes/${id}`,data) // oassando id que vou editar
    //agora vou passar os dados pro end-point clientes/id
    return response.data; // vou retornar com a mensagem que deu certo o update
}

// carregar Reserva de Cliente Por id:
export async function getClienteReservas(id){
    const response = await axios.get(`http://localhost:3001/clientes/${id}/reservas`);
    return response.data;
}
