import { instance } from "../instance";

export async function prediccionesTendencias(dias_analisis) {
  try {
    const { data } = await instance.get(
      `/predicciones/tendencias?dias_analisis=${dias_analisis}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function prediccionesDemanda(id_producto) {
  try {
    const { data } = await instance.get(`/predicciones/demanda/${id_producto}`);
    return data;
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
