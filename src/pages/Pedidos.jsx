// Pedidos.jsx
import React, { useEffect, useState } from "react";
import {
  listaPedidosSucursalPaginados,
  listaSucursales,
} from "../axios/pedidos/pedidos";
import TablaPedidos from "../components/TablaPedidos";
import AgregarPedido from "../components/AgregarPedido";

export default function Pedidos() {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [modalNuevoPedido, setModalNuevoPedido] = useState(false);
  const [dataSucursales, setDataSucursales] = useState([]);
  const [pagination, setPagination] = useState({
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const cargarSucursales = async () => {
      try {
        const sucursales = await listaSucursales();
        setDataSucursales(sucursales);
        if (sucursales.length > 0) {
          setSucursalSeleccionada(sucursales[0].id_sucursal);
        }
      } catch (error) {
        console.error("Error cargando sucursales:", error);
      }
    };

    cargarSucursales();
  }, []);

  const cargarPedidos = async (page = 1) => {
    if (!sucursalSeleccionada) return;

    setPagination((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const resultado = await listaPedidosSucursalPaginados(
        sucursalSeleccionada,
        page,
        pagination.pageSize
      );

      setPagination({
        data: resultado.data,
        total: resultado.total,
        page: resultado.page,
        pageSize: resultado.pageSize,
        totalPages: resultado.totalPages,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error cargando pedidos:", error);
      setPagination((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Error al cargar los pedidos",
      }));
    }
  };

  useEffect(() => {
    if (sucursalSeleccionada) {
      cargarPedidos(1);
    }
  }, [sucursalSeleccionada]);

  const manejarCambioPagina = (nuevaPagina) => {
    cargarPedidos(nuevaPagina);
  };

  const manejarPedidoCreado = () => {
    setModalNuevoPedido(false);
    cargarPedidos(1);
  };

  const sucursalActual = dataSucursales.find(
    (s) => s.id_sucursal === sucursalSeleccionada
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Administración de Pedidos
        </h1>
        <div className="bg-green-100 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Seleccione una Sucursal
          </h2>
          <div className="flex flex-wrap gap-2">
            {dataSucursales.map((sucursal) => (
              <button
                key={sucursal.id_sucursal}
                onClick={() => setSucursalSeleccionada(sucursal.id_sucursal)}
                className={`px-4 py-2 rounded-full transition-all font-semibold ${
                  sucursalSeleccionada === sucursal.id_sucursal
                    ? "bg-purple-700 text-white shadow-md"
                    : "bg-purple-300 text-purple-900 hover:bg-purple-400"
                }`}
              >
                {sucursal.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de pedidos */}
      <div className="bg-green-100 rounded-lg shadow-md p-4">
        {/* Título y botón */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900">
            Pedido de {sucursalActual?.nombre || "Sucursal"} 🍦
          </h2>
          <button
            onClick={() => setModalNuevoPedido(true)}
            className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-2 px-4 rounded-lg shadow inline-flex items-center"
          >
            + Nueva Pedido 🍦
          </button>
        </div>

        {/* Tabla o estado de carga */}
        {pagination.loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : pagination.error ? (
          <div className="p-6 text-center">
            <div className="text-red-500 mb-3">{pagination.error}</div>
            <button
              onClick={() => cargarPedidos(pagination.page)}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-200"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <TablaPedidos
            pedidos={pagination.data}
            currentPage={pagination.page}
            itemsPerPage={pagination.pageSize}
            totalItems={pagination.total}
            onPageChange={manejarCambioPagina}
          />
        )}
      </div>

      {/* Modal agregar */}
      {modalNuevoPedido && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <AgregarPedido
            setModalNuevoPedido={setModalNuevoPedido}
            sucursalSeleccionada={sucursalSeleccionada}
            sucursales={dataSucursales}
            onPedidoCreado={manejarPedidoCreado}
          />
        </div>
      )}
    </div>
  );
}
