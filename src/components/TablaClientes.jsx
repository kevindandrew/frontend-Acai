import VerCliente from "./VerCliente";
import EditarCliente from "./EditarCliente";
import { useState } from "react";

export default function TablaClientes({ data }) {
  const [clienteVer, setClienteVer] = useState(null);
  const [clienteEditar, setClienteEditar] = useState(null);
  const [filtroApellido, setFiltroApellido] = useState("");
  const [filtroCiNit, setFiltroCiNit] = useState("");

  const clientesFiltrados = data.filter((cliente) => {
    const coincideApellido = cliente.apellido
      .toLowerCase()
      .includes(filtroApellido.toLowerCase());
    const coincideCiNit = cliente.ci_nit
      .toLowerCase()
      .includes(filtroCiNit.toLowerCase());
    return coincideApellido && coincideCiNit;
  });
  return (
    <>
      <div className="flex-wrap">
        <input
          type="text"
          placeholder="Buscar por CI o NIT"
          value={filtroCiNit}
          onChange={(e) => setFiltroCiNit(e.target.value)}
          className="border-2 border-[#8d127b] rounded px-3 py-1 m-2"
        />
        <input
          type="text"
          placeholder="Buscar por Apellido"
          value={filtroApellido}
          onChange={(e) => setFiltroApellido(e.target.value)}
          className="border-2 border-[#8d127b] rounded px-3 py-1 m-2"
        />
      </div>

      <div className="overflow-x-auto p-4 ">
        <div className="shadow-lg ">
          <table className="min-w-full bg-white overflow-hidden rounded-lg">
            <thead className="bg-[#3bb48b] text-white">
              <tr>
                <th className="py-2 px-4 ">CI o NIT</th>
                <th className="py-2 px-4">Apellido</th>
                <th className="py-2 px-4">Opciones</th>
              </tr>
            </thead>
            {clientesFiltrados
              .sort((a, b) => a.apellido.localeCompare(b.apellido))
              .map((cliente, index) => {
                return (
                  <tbody key={index}>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 text-center">
                      <td className="py-2 px-4 ">{cliente.ci_nit}</td>
                      <td className="py-2 px-4">{cliente.apellido}</td>

                      <td className="py-2 px-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer hover:text-black hover:scale-110"
                            onClick={() => setClienteVer(cliente)}
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
                            onClick={() => setClienteEditar(cliente)}
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
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          {clienteVer && (
            <VerCliente setClienteVer={setClienteVer} cliente={clienteVer} />
          )}
          {clienteEditar && (
            <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
              <EditarCliente
                setModalAbierto={setClienteEditar}
                cliente={clienteEditar}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
