import { instance } from "../instance";

export async function listaSucursales() {
  try {
    const { data } = await instance.get("/sucursales");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listapersonal() {
  try {
    const { data } = await instance.get("/personal");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editarPersonal(request, id_personal) {
  try {
    const { status } = await instance.put(`/personal/${id_personal}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function crearPersonal(request) {
  try {
    const { status } = await instance.post(`/personal`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function eliminarPersonal(id_personal) {
  try {
    const { status } = await instance.delete(`/personal/${id_personal}`);
    return status;
  } catch (error) {
    throw error;
  }
}
