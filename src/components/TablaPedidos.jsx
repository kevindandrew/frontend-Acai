import React, { useState } from "react";
import EditarPedido from "./EditarPedido";
import VerPedido from "./VerPedido";

const formatCurrency = (value) => {
  const num = Number(value) || 0;
  return num.toFixed(2) + " Bs";
};

const formatDate = (dateString) => {
  if (!dateString) return "--";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

const estiloEstado = (estado) => {
  const estilos = {
    Pendiente: "bg-yellow-100 text-yellow-800",
    Pagado: "bg-green-100 text-green-800",
    Cancelado: "bg-red-100 text-red-800",
    Procesando: "bg-blue-100 text-blue-800",
  };
  return estilos[estado] || "bg-gray-100 text-gray-800";
};

export default function TablaPedidos({
  pedidos = [],
  currentPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
  onPageChange = () => {},
}) {
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [pedidoVer, setPedidoVer] = useState(null);
  const [filtro, setFiltro] = useState({
    nombre: "",
    estado: "",
  });

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideNombre = (pedido.nombre_cliente || "")
      .toLowerCase()
      .includes(filtro.nombre.toLowerCase());
    const coincideEstado = filtro.estado
      ? pedido.estado === filtro.estado
      : true;
    return coincideNombre && coincideEstado;
  });

  return (
    <div className="w-full">
      {/* Filtros */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por cliente
            </label>
            <input
              type="text"
              placeholder="Nombre del cliente..."
              value={filtro.nombre}
              onChange={(e) => setFiltro({ ...filtro, nombre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por estado
            </label>
            <select
              value={filtro.estado}
              onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
              <option value="Procesando">Procesando</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFiltro({ nombre: "", estado: "" })}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de pedidos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Productos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id_pedido} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{pedido.id_pedido}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {pedido.nombre_cliente || "Consumidor final"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pedido.metodo_pago}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {pedido.detalles?.slice(0, 2).map((detalle, idx) => (
                        <div key={idx} className="mb-1">
                          •{" "}
                          {detalle.tipo_producto === "Establecido"
                            ? detalle.nombre_producto
                            : detalle.producto_personalizado
                                ?.nombre_personalizado}
                          <span className="text-gray-500 ml-1">
                            (x{detalle.cantidad})
                          </span>
                        </div>
                      ))}
                      {pedido.detalles?.length > 2 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{pedido.detalles.length - 2} productos más...
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(pedido.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${estiloEstado(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(pedido.fecha_pedido)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPedidoVer(pedido)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Ver detalles"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setPedidoEditar(pedido)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Editar"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No se encontraron pedidos que coincidan con los filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalItems > itemsPerPage && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                a{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{" "}
                de <span className="font-medium">{totalItems}</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage <= 1
                      ? "text-gray-300"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Anterior</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {Array.from(
                  { length: Math.min(5, Math.ceil(totalItems / itemsPerPage)) },
                  (_, i) => {
                    let pagina;
                    if (Math.ceil(totalItems / itemsPerPage) <= 5) {
                      pagina = i + 1;
                    } else if (currentPage <= 3) {
                      pagina = i + 1;
                    } else if (
                      currentPage >=
                      Math.ceil(totalItems / itemsPerPage) - 2
                    ) {
                      pagina = Math.ceil(totalItems / itemsPerPage) - 4 + i;
                    } else {
                      pagina = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pagina}
                        onClick={() => onPageChange(pagina)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pagina
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pagina}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage >= Math.ceil(totalItems / itemsPerPage)
                      ? "text-gray-300"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Siguiente</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modales */}
      {pedidoVer && (
        <VerPedido pedido={pedidoVer} onClose={() => setPedidoVer(null)} />
      )}

      {pedidoEditar && (
        <EditarPedido
          pedido={pedidoEditar}
          onClose={() => setPedidoEditar(null)}
          onGuardado={() => {
            setPedidoEditar(null);
            onPageChange(currentPage); // Recargar la página actual
          }}
        />
      )}
    </div>
  );
}
