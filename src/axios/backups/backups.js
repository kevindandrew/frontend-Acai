// axios/backups/backups.js
import { instance } from "../instance";

// 1. Crear backup en formato SQL
export async function crearBackupSQL() {
  try {
    const { status } = await instance.post("/backups/backup-sql");
    return status;
  } catch (error) {
    throw error;
  }
}

// 2. Listar archivos de backup con paginación
export async function listarBackups(skip = 0, limit = 100) {
  try {
    const { data } = await instance.get(
      `/backups/listar?skip=${skip}&limit=${limit}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// 3. Descargar backup específico
export async function descargarBackup(filename) {
  try {
    const response = await instance.get(`/backups/descargar/${filename}`, {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// 4. Eliminar backup específico (requiere permisos)
export async function eliminarBackup(filename) {
  try {
    const { status } = await instance.delete(`/backups/eliminar/${filename}`);
    return status;
  } catch (error) {
    throw error;
  }
}
