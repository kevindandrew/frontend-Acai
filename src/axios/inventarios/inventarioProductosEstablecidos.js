import { instance } from "../instance";

export async function listaInventarioProductosEstablecidos(id_sucursal) {
  try {
    const { data } = await instance.get(
      `/inventario/productos/sucursal/${id_sucursal}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function ajustarInventarioProductoEstablecido(
  request,
  id_sucursal,
  id_producto_establecido
) {
  try {
    const { status } = await instance.patch(
      `/inventario/productos/ajustar?id_sucursal=${id_sucursal}&id_producto=${id_producto_establecido}`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function asignarInventarioProductoEstablecido(request) {
  try {
    const { status } = await instance.post(
      `/inventario/productos/asignar`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}
export async function transferirInventarioProductoEstablecido(request) {
  try {
    const { status } = await instance.post(
      `/inventario/productos/transferir`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function listaProductosEstablecidos() {
  try {
    const { data } = await instance.get("/productos/establecidos");
    return data;
  } catch (error) {
    throw error;
  }
}
