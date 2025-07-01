import { instance } from "../instance";
export async function listaClientes() {
  try {
    const { data } = await instance.get("/clientes");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function editarCliente(request, id_clientes) {
  try {
    const { status } = await instance.put(`/clientes/${id_clientes}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function crearCliente(request) {
  try {
    const { status } = await instance.post(`/clientes`, request);
    return status;
  } catch (error) {
    throw error;
  }
}
