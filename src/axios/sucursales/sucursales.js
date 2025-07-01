import { instance } from "../instance";
export async function listaSucursales() {
  try {
    const { data } = await instance.get("/sucursales");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function editarSucursal(request, id_sucursal) {
  try {
    const { status } = await instance.put(
      `/sucursales/${id_sucursal}`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function crearSucursal(request) {
  try {
    const { status } = await instance.post(`/sucursales`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function eliminarSucursal(id_sucursal) {
  try {
    const { status } = await instance.delete(`/sucursales/${id_sucursal}`);
    return status;
  } catch (error) {
    throw error;
  }
}
