import { instance } from "../instance";
export async function listaMateriasPrimas() {
  try {
    const { data } = await instance.get("/productos/materias-primas");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function editarMateriaPrima(request, id_materias_primas) {
  try {
    const { status } = await instance.put(
      `/productos/materias-primas/${id_materias_primas}`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function crearMateriaPrima(request) {
  try {
    const { status } = await instance.post(
      `/productos/materias-primas`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function eliminarMateriaPrima(id_materias_primas) {
  try {
    const { status } = await instance.delete(
      `/productos/materias-primas/${id_materias_primas}`
    );
    return status;
  } catch (error) {
    throw error;
  }
}
