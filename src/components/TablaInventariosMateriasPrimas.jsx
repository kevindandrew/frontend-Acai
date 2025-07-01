import React, { useState } from "react";
import EditarInventarioMateriaPrima from "./EditarInventarioMateriaPrima";

export default function TablaInventariosMateriasPrimas({ data, sucursales }) {
  const [inventarioMateriaPrimaEditar, setInventarioMateriaPrimaEditar] =
    useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");

  const materiasprimasFiltrados = data.filter((materiasprimas) => {
    const coincideNombre = materiasprimas.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());

    return coincideNombre;
  });

  return (
    <>
      <div className="flex-wrap">
        <input
          type="text"
          placeholder="Buscar Materia Prima"
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
                <th className="py-2 px-4 ">Id Sucursal</th>
                <th className="py-2 px-4">Cantidad de Stock</th>
                <th className="py-2 px-4">Nombre Materia Prima</th>
                <th className="py-2 px-4">Unidad</th>
                <th className="py-2 px-4">Precio Unitario</th>
                <th className="py-2 px-4">Stock Minimo</th>
                <th className="py-2 px-4">Fecha Caducidad</th>
                <th className="py-2 px-4">Bajo en Stock</th>
                <th className="py-2 px-4">Editar</th>
              </tr>
            </thead>
            {materiasprimasFiltrados
              .sort((a, b) => a.id_materia_prima - b.id_materia_prima)
              .map((inventarioMateriaPrima, index) => {
                return (
                  <tbody key={index}>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 text-center">
                      <td className="py-2 px-4 ">
                        {
                          sucursales.find(
                            (sucursal) =>
                              sucursal.id_sucursal ===
                              inventarioMateriaPrima.id_sucursal
                          )?.nombre
                        }
                      </td>
                      <td className="py-2 px-4">
                        {inventarioMateriaPrima.cantidad_stock}
                      </td>
                      <td className="py-2 px-4">
                        {inventarioMateriaPrima.nombre}
                      </td>
                      <td className="py-2 px-4">
                        {inventarioMateriaPrima.unidad}
                      </td>
                      <td className="py-2 px-4">
                        {inventarioMateriaPrima.precio_unitario}
                        {" Bs"}
                      </td>
                      <td className="py-2 px-4">
                        {inventarioMateriaPrima.stock_minimo}
                      </td>
                      <td className="py-2 px-4">
                        {inventarioMateriaPrima.fecha_caducidad}
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={
                            inventarioMateriaPrima.bajo_stock
                              ? "text-red-600 font-bold"
                              : "text-green-600 font-bold"
                          }
                        >
                          {inventarioMateriaPrima.bajo_stock ? "Si" : "No"}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="bg-orange-400 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-orange-500 hover:text-black hover:scale-110"
                            onClick={() =>
                              setInventarioMateriaPrimaEditar(
                                inventarioMateriaPrima
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
              })}
          </table>

          {inventarioMateriaPrimaEditar && (
            <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
              <EditarInventarioMateriaPrima
                setModalAbierto={setInventarioMateriaPrimaEditar}
                inventarioMateriaPrima={inventarioMateriaPrimaEditar}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
