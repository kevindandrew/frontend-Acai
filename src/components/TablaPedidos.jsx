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
  const [filtro, setFiltro] = useState({ nombre: "", estado: "" });

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
      <div className="p-4">
        <input
          type="text"
          placeholder="📋 Nombre del Cliente"
          value={filtro.nombre}
          onChange={(e) => setFiltro({ ...filtro, nombre: e.target.value })}
          className="w-full md:w-1/3 px-4 py-2 border-2 border-violet-600 rounded-md mb-4 outline-none focus:ring focus:ring-violet-300"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow text-sm text-gray-700">
          <thead className="bg-green-600 text-white text-left">
            <tr>
              <th className="px-4 py-3">Id Pedido</th>
              <th className="px-4 py-3">Nombre del Producto</th>
              <th className="px-4 py-3">Nombre Cliente</th>
              <th className="px-4 py-3">Total a Cancelar</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Metodo de Pago</th>
              <th className="px-4 py-3">Fecha de Pedido</th>
              <th className="px-4 py-3">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((pedido) => (
                <tr
                  key={pedido.id_pedido}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    {pedido.id_pedido}
                  </td>
                  <td className="px-4 py-2">
                    {pedido.detalles?.slice(0, 2).map((d, idx) => (
                      <div key={idx}>
                        •{" "}
                        {d.tipo_producto === "Establecido"
                          ? d.nombre_producto
                          : d.producto_personalizado?.nombre_personalizado}
                      </div>
                    ))}
                    {pedido.detalles?.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{pedido.detalles.length - 2} más...
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {pedido.nombre_cliente || "Consumidor final"}
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    {formatCurrency(pedido.total)}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${estiloEstado(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2">{pedido.metodo_pago}</td>
                  <td className="px-4 py-2">
                    {formatDate(pedido.fecha_pedido)}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPedidoVer(pedido)}
                        title="Ver pedido"
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => setPedidoEditar(pedido)}
                        title="Editar pedido"
                        className="bg-orange-400 hover:bg-orange-500 text-white px-2 py-1 rounded-md text-sm"
                      >
                        📝
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  No se encontraron pedidos que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalItems > itemsPerPage && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-3 py-1 rounded-md border text-sm font-semibold ${
              currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            ⬅️ Anterior
          </button>

          <span className="px-4 py-1 text-sm">
            Página <strong>{currentPage}</strong>
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
            className={`px-3 py-1 rounded-md border text-sm font-semibold ${
              currentPage >= Math.ceil(totalItems / itemsPerPage)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Siguiente ➡️
          </button>
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
            onPageChange(currentPage);
          }}
        />
      )}
    </div>
  );
}
