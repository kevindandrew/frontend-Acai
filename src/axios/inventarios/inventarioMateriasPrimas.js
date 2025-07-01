import { instance } from "../instance";
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

export async function listaSucursales() {
  try {
    const { data } = await instance.get("/sucursales");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function ajustarInventarioMateriaPrima(
  request,
  id_sucursal,
  id_materia_prima
) {
  try {
    const { status } = await instance.patch(
      `/inventario/materias-primas/ajustar?id_sucursal=${id_sucursal}&id_materia=${id_materia_prima}`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function asignarInventarioMateriaPrima(request) {
  try {
    const { status } = await instance.post(
      `/inventario/materias-primas/asignar`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function listaMateriasPrimas() {
  try {
    const { data } = await instance.get("/productos/materias-primas");
    return data;
  } catch (error) {
    throw error;
  }
}
