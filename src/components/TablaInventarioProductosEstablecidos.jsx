import React, { useState } from "react";
import EditarInventarioProductoEstablecido from "./EditarInventarioProductoEstablecido";

export default function TablaInventarioProductosEstablecidos({
  data,
  sucursales,
}) {
  const [
    inventarioProductoEstablecidoEditar,
    setInventarioProductoEstablecidoEditar,
  ] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");

  const productosestablecidosFiltrados = data.filter(
    (productosestablecidos) => {
      const coincideNombre = productosestablecidos.nombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase());

      return coincideNombre;
    }
  );

  return (
    <>
      <div className="flex-wrap">
        <input
          type="text"
          placeholder="Buscar Producto Establecido"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="border-2 border-[#8d127b] rounded px-3 py-1 m-2"
        />
      </div>
      <div className="overflow-x-auto p-4 ">
        <div className="shadow-lg ">
          <table className="min-w-full bg-white overflow-hidden rounded-lg">
            <thead className="bg-[#3bb48b] text-white">
              <tr>
                <th className="py-2 px-4 ">Sucursal</th>
                <th className="py-2 px-4">Nombre del Producto Establecido</th>
                <th className="py-2 px-4">Cantidad Disponible</th>
                <th className="py-2 px-4">Es helado?</th>
                <th className="py-2 px-4">Editar</th>
              </tr>
            </thead>
            {productosestablecidosFiltrados.map(
              (inventarioProductoEstablecido, index) => {
                return (
                  <tbody key={index}>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 text-center">
                      <td className="py-2 px-4 ">
                        {
                          sucursales.find(
                            (sucursal) =>
                              sucursal.id_sucursal ===
                              inventarioProductoEstablecido.id_sucursal
                          )?.nombre
                        }
                      </td>
                      <td className="py-2 px-4">
                        {inventarioProductoEstablecido.nombre}
                      </td>
                      <td className="py-2 px-4">
                        {inventarioProductoEstablecido.cantidad_disponible}
                      </td>

                      <td className="py-2 px-4">
                        {inventarioProductoEstablecido.es_helado === true
                          ? "Si"
                          : "No"}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="bg-orange-400 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-orange-500 hover:text-black hover:scale-110"
                            onClick={() =>
                              setInventarioProductoEstablecidoEditar(
                                inventarioProductoEstablecido
                              )
                            }
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
              }
            )}
          </table>
          {inventarioProductoEstablecidoEditar && (
            <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
              <EditarInventarioProductoEstablecido
                setModalAbierto={setInventarioProductoEstablecidoEditar}
                inventarioProductoEstablecido={
                  inventarioProductoEstablecidoEditar
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
