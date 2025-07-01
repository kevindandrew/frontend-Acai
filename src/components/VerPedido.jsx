import React from "react";

export default function VerPedido({ pedido, onClose }) {
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

  if (!pedido) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Error</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p>No se encontró información del pedido</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-[#3bb48b] text-white p-4">
          <h2 className="text-xl font-bold">
            Detalles del Pedido #{pedido.id_pedido}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-semibold">Fecha y Hora:</p>
              <p>{formatDate(pedido.fecha_pedido)}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <span
                className={`px-2 py-1 rounded-full text-sm ${estiloEstado(
                  pedido.estado
                )}`}
              >
                {pedido.estado}
              </span>
            </div>
            <div>
              <p className="font-semibold">Personal:</p>
              <p>{pedido.nombre_personal || "No especificado"}</p>
            </div>
            <div>
              <p className="font-semibold">Sucursal:</p>
              <p>{pedido.nombre_sucursal || "No especificada"}</p>
            </div>
            <div>
              <p className="font-semibold">Cliente:</p>
              <p>{pedido.nombre_cliente || "Consumidor final"}</p>
            </div>
            <div>
              <p className="font-semibold">Método de Pago:</p>
              <p>{pedido.metodo_pago || "No especificado"}</p>
            </div>
          </div>

          <hr className="my-4" />

          <h3 className="text-lg font-semibold mb-3">Productos:</h3>
          <div className="space-y-3">
            {pedido.detalles?.map((detalle, index) => (
              <div
                key={detalle.id_detalle_pedido || index}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {index + 1}.{" "}
                      {detalle.tipo_producto === "Establecido"
                        ? detalle.nombre_producto
                        : detalle.producto_personalizado?.nombre_personalizado}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cantidad: {detalle.cantidad}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatCurrency(detalle.subtotal)}
                  </p>
                </div>

                {detalle.tipo_producto === "Personalizado" && (
                  <div className="mt-2 pl-4 border-l-2 border-gray-200">
                    <p className="text-sm font-medium mb-1">Ingredientes:</p>
                    <ul className="text-sm space-y-1">
                      {detalle.producto_personalizado?.detalles?.map(
                        (mp, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{mp.nombre_materia}</span>
                            <span>
                              {mp.cantidad} {mp.unidad} (
                              {formatCurrency(mp.subtotal)})
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-end">
            <p className="text-lg font-bold">
              Total: {formatCurrency(pedido.total)}
            </p>
          </div>
        </div>

        {/* Pie de página */}
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
