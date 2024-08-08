import axios from "axios"

export async function getReservas() {
  const response = await axios.get('http://localhost:3001/reservas')
  return response.data
}

export async function addReserva(data) { 
  const response = await axios.post('http://localhost:3001/reservas', data)
  
  return response.data
}

export async function deleteReserva(id) {
  const response = await axios.delete(`http://localhost:3001/reservas/${id}`)
  return response.data
}

export async function getReserva(id) {
  const response = await axios.get(`http://localhost:3001/reservas/${id}`)
  return response.data
}

export async function updateReserva(id, data) {
  const response = await axios.put(`http://localhost:3001/reservas/${id}`, data)
  return response.data
}
