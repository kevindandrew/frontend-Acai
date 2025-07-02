// pages/backups.jsx
import React, { useEffect, useState } from "react";
import {
  crearBackupSQL,
  listarBackups,
  descargarBackup,
  eliminarBackup,
} from "../axios/backups/backups";
import { format } from "date-fns";

export default function Backups() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const cargarBackups = async () => {
    try {
      setLoading(true);
      const data = await listarBackups();
      setBackups(data);
    } catch (error) {
      console.error("Error al listar backups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBackups();
  }, []);

  const handleCrearBackup = async () => {
    try {
      setCreating(true);
      await crearBackupSQL();
      await cargarBackups();
    } catch (error) {
      console.error("Error al crear backup:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDescargar = async (filename) => {
    try {
      const res = await descargarBackup(filename);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar:", error);
    }
  };

  const handleEliminar = async (filename) => {
    if (!confirm(`¿Deseas eliminar el backup: ${filename}?`)) return;
    try {
      await eliminarBackup(filename);
      await cargarBackups();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
        🗂️ Gestión de Backups
      </h1>
      <div className="text-center mb-6">
        <button
          onClick={handleCrearBackup}
          disabled={creating}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 disabled:opacity-50"
        >
          {creating ? "Creando Backup..." : "Crear Backup SQL"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-purple-700">
          Cargando lista de backups...
        </p>
      ) : backups.length === 0 ? (
        <p className="text-center text-purple-500">
          No hay backups disponibles.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="px-4 py-2 text-left">Archivo</th>
                <th className="px-4 py-2 text-left">Tamaño (MB)</th>
                <th className="px-4 py-2 text-left">Fecha de creación</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b, i) => (
                <tr key={i} className="border-b hover:bg-purple-50">
                  <td className="px-4 py-2 font-medium">{b.filename}</td>
                  <td className="px-4 py-2">{b.size_mb.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {format(new Date(b.created_at), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleDescargar(b.filename)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Descargar
                    </button>
                    <button
                      onClick={() => handleEliminar(b.filename)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
