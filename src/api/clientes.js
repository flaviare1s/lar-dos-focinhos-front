import axios from 'axios';

// -------- CRUD DE CLIENTES --------

// 1. GET 

export async function getClientes(){
    const response = await axios.get("http://localhost:3001/clientes");
    //dentro de data está o JSON de resposta do back-end
    return response.data;
}