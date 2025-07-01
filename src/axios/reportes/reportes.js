import { instance } from "../instance";

export async function reportesMasVendidos() {
  try {
    const { data } = await instance.get("/reportes/productos-mas-vendidos");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function reportesSucursalesTop() {
  try {
    const { data } = await instance.get("/reportes/sucursales-top");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function reportesMateriasMasUsadas() {
  try {
    const { data } = await instance.get("/reportes/materias-mas-usadas");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function reportesClientesFrecuentes() {
  try {
    const { data } = await instance.get("/reportes/clientes-frecuentes");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function reportesVentasPorHorario() {
  try {
    const { data } = await instance.get("/reportes/ventas-por-horario");
    return data;
  } catch (error) {
    throw error;
  }
}
