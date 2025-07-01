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

  // Cargar sucursales al montar el componente
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

  // Cargar pedidos cuando cambia la sucursal o la página
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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Encabezado y selector de sucursal */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Gestión de Pedidos
        </h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Seleccionar Sucursal
          </h2>
          <div className="flex flex-wrap gap-2">
            {dataSucursales.map((sucursal) => (
              <button
                key={sucursal.id_sucursal}
                onClick={() => setSucursalSeleccionada(sucursal.id_sucursal)}
                className={`px-4 py-2 rounded-full transition-all ${
                  sucursalSeleccionada === sucursal.id_sucursal
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {sucursal.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel principal de pedidos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Barra de herramientas */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Pedidos de{" "}
              {sucursalSeleccionada
                ? dataSucursales.find(
                    (s) => s.id_sucursal === sucursalSeleccionada
                  )?.nombre
                : "Sucursal"}
            </h2>
            {!pagination.loading && (
              <p className="text-sm text-gray-500 mt-1">
                Mostrando {(pagination.page - 1) * pagination.pageSize + 1} -
                {Math.min(
                  pagination.page * pagination.pageSize,
                  pagination.total
                )}{" "}
                de {pagination.total} registros
              </p>
            )}
          </div>

          <button
            onClick={() => setModalNuevoPedido(true)}
            className="mt-3 md:mt-0 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Nuevo Pedido
          </button>
        </div>

        {/* Contenido */}
        {pagination.loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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

      {/* Modal para nuevo pedido */}
      {modalNuevoPedido && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <AgregarPedido
              setModalNuevoPedido={setModalNuevoPedido}
              sucursalSeleccionada={sucursalSeleccionada}
              sucursales={dataSucursales}
              onPedidoCreado={manejarPedidoCreado}
            />
          </div>
        </div>
      )}
    </div>
  );
}
