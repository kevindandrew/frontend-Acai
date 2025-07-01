import { instance } from "../instance";
export async function listaProductosEstablecidos() {
  try {
    const { data } = await instance.get("/productos/establecidos");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function editarProductoEstablecido(
  request,
  id_producto_establecido
) {
  try {
    const { status } = await instance.put(
      `/productos/establecidos/${id_producto_establecido}`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function crearProductoEstablecido(request) {
  try {
    const { status } = await instance.post(`/productos/establecidos`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function eliminarProductoEstablecido(id_producto_establecido) {
  try {
    const { status } = await instance.delete(
      `/productos/establecidos/${id_producto_establecido}`
    );
    return status;
  } catch (error) {
    throw error;
  }
}
