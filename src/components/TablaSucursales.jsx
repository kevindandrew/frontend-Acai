import { useState } from "react";
import EditarSucursal from "./EditarSucursal";
import { eliminarSucursal } from "../axios/sucursales/sucursales";
import ModalConfirmacion from "./ModalConfirmacion";
import VerSucursal from "./VerSucursal";
import ModalAlerta from "../components/ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";

export default function TablaSucursales({ data }) {
  const [sucursalVer, setSucursalVer] = useState(null);
  const [sucursalEditar, setSucursalEditar] = useState(null);
  const [sucursalEliminar, setSucursalEliminar] = useState(null);
  const { alerta, mostrarAlerta } = useModalAlerta();

  const confirmarEliminacion = async () => {
    if (sucursalEliminar) {
      try {
        const status = await eliminarSucursal(sucursalEliminar.id_sucursal);
        if (status === 204) {
          mostrarAlerta("exito", "Sucursal Eliminada con Éxito");
          setTimeout(() => {
            setSucursalEliminar(false);
          }, 2200);
          setTimeout(() => {
            window.location.reload();
          }, 2200);
        }
      } catch (error) {
        console.error("Error eliminando sucursal:", error);
        mostrarAlerta("error", "Error al Eliminar Sucursal");
      }
    }
  };

  return (
    <div className="overflow-x-auto p-4 ">
      <div className="shadow-lg ">
        <table className="min-w-full bg-white overflow-hidden rounded-lg">
          <thead className="bg-[#3bb48c] text-white">
            <tr>
              <th className="py-2 px-4 ">Nombre</th>
              <th className="py-2 px-4">Ubicación</th>
              <th className="py-2 px-4">Horario Apertura</th>
              <th className="py-2 px-6">Horario Cierre</th>
              <th className="py-2 px-4">Opciones</th>
            </tr>
          </thead>
          {data
            .sort((a, b) => a.id_sucursal - b.id_sucursal)
            .map((sucursal, index) => {
              return (
                <tbody key={index}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100 text-center">
                    <td className="py-2 px-4 ">{sucursal.nombre}</td>
                    <td className="py-2 px-4">{sucursal.direccion}</td>
                    <td className="py-2 px-4">{sucursal.horario_apertura}</td>
                    <td className="py-2 px-4">{sucursal.horario_cierre}</td>
                    <td className="py-2 px-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer hover:text-black hover:scale-110"
                          onClick={() => setSucursalVer(sucursal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                        <button
                          className="bg-orange-400 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-orange-500 hover:text-black hover:scale-110"
                          onClick={() => setSucursalEditar(sucursal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer hover:text-black hover:scale-110"
                          onClick={() => setSucursalEliminar(sucursal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
        {sucursalVer && (
          <VerSucursal setSucursalVer={setSucursalVer} sucursal={sucursalVer} />
        )}
        {sucursalEditar && (
          <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
            <EditarSucursal
              setModalAbierto={setSucursalEditar}
              sucursal={sucursalEditar}
            />
          </div>
        )}

        {sucursalEliminar && (
          <ModalConfirmacion
            mensaje={`¿Estás seguro que quieres eliminar la sucursal "${sucursalEliminar.nombre}"?`}
            onConfirmar={confirmarEliminacion}
            onCancelar={() => setSucursalEliminar(null)}
          />
        )}
      </div>
      <ModalAlerta
        show={alerta.show}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
      />
    </div>
  );
}
