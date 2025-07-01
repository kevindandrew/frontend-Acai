import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { actualizarPedido } from "../axios/pedidos/pedidos";

export default function EditarPedido({ pedido, onClose, onGuardado }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (pedido) {
      reset({
        estado: pedido.estado || "Pendiente",
        metodo_pago: pedido.metodo_pago || "Efectivo",
      });
    }
  }, [pedido, reset]);

  const onSubmit = async (data) => {
    try {
      await actualizarPedido(data, pedido.id_pedido);
      onGuardado?.();
      onClose();
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
      alert("Ocurrió un error al actualizar el pedido");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-[#3bb48b] text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">
            Editar Pedido #{pedido?.id_pedido}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                {...register("estado", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3bb48b]"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
                <option value="Procesando">Procesando</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de Pago
              </label>
              <select
                {...register("metodo_pago", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3bb48b]"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#3bb48b] text-white rounded-md hover:bg-[#2d9a7a] disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
