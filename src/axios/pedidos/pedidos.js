import { instance } from "../instance";
export async function listaPedidos(id_pedido) {
  try {
    const { data } = await instance.get(`/pedidos/${id_pedido}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaSucursales() {
  try {
    const { data } = await instance.get("/sucursales");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaPedidosSucursal(id_sucursal) {
  try {
    const { data } = await instance.get(`/pedidos/sucursal/${id_sucursal}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function crearPedido(request) {
  try {
    const { status } = await instance.post(`/pedidos`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function actualizarPedido(request, id_pedido) {
  try {
    const { status } = await instance.patch(`/pedidos/${id_pedido}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}
export async function confirmarPedido(request, id_pedido) {
  try {
    const { status } = await instance.patch(
      `/pedidos?pedido_id=${id_pedido}/confirmar`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function listaPersonal() {
  try {
    const { data } = await instance.get("/personal");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaClientes() {
  try {
    const { data } = await instance.get("/clientes");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function crearCliente(request) {
  try {
    const response = await instance.post(`/clientes`, request);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listaInventariosMateriasPrimas(id_sucursal) {
  try {
    const { data } = await instance.get(
      `/inventario/materias-primas/sucursal/${id_sucursal}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

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
export const listaPedidosSucursalPaginados = async (
  sucursalId,
  page = 1,
  pageSize = 20,
  estado = null
) => {
  try {
    // Validación de parámetros
    if (!sucursalId) throw new Error("Se requiere el ID de sucursal");
    if (page < 1) page = 1;
    if (pageSize < 1 || pageSize > 100) pageSize = 20;

    const params = {
      page,
      page_size: pageSize,
    };

    // Agregar filtro de estado si está presente
    if (estado) params.estado = estado;

    console.log(
      `Consultando API: /pedidos/sucursal/${sucursalId}/optimizado`,
      params
    );

    const response = await instance.get(
      `https://api-acai.onrender.com/pedidos/sucursal/${sucursalId}/optimizado`,
      { params }
    );

    // Validación de respuesta
    if (!response.data) {
      throw new Error("La respuesta del servidor no contiene datos");
    }

    // Extraer metadatos de paginación
    const paginationData = {
      total:
        parseInt(response.headers["x-total-count"]) ||
        response.data.length ||
        0,
      page: parseInt(response.headers["x-page"]) || page,
      pageSize: parseInt(response.headers["x-page-size"]) || pageSize,
      totalPages:
        parseInt(response.headers["x-total-pages"]) ||
        Math.ceil(
          (parseInt(response.headers["x-total-count"]) ||
            response.data.length) / pageSize
        ) ||
        1,
    };

    console.log("Datos de paginación recibidos:", paginationData);

    return {
      data: Array.isArray(response.data) ? response.data : [response.data],
      ...paginationData,
    };
  } catch (error) {
    console.error("Error en listaPedidosSucursalPaginados:", {
      error: error.message,
      url: `/pedidos/sucursal/${sucursalId}/optimizado`,
      params,
    });

    throw new Error(`Error al cargar pedidos: ${error.message}`);
  }
};
