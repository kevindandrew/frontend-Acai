import React, { useEffect } from "react";
import { ajustarInventarioProductoEstablecido } from "../axios/inventarios/inventarioProductosEstablecidos";
import { useForm } from "react-hook-form";
import { useModalAlerta } from "../hooks/useModalAlerta";
import ModalAlerta from "./ModalAlerta";

export default function EditarInventarioProductoEstablecido({
  setModalAbierto,
  inventarioProductoEstablecido,
}) {
  const { register, reset, handleSubmit } = useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();
  useEffect(() => {
    if (inventarioProductoEstablecido) {
      reset({
        cantidad: inventarioProductoEstablecido.cantidad_disponible,
        motivo: inventarioProductoEstablecido.motivo,
      });
    }
  }, [inventarioProductoEstablecido, reset]);
  async function handleEdit(requestData) {
    try {
      const status = await ajustarInventarioProductoEstablecido(
        requestData,
        inventarioProductoEstablecido.id_sucursal,
        inventarioProductoEstablecido.id_producto_establecido
      );
      if (status === 200) {
        mostrarAlerta("exito", "Stock Actualizado con Éxito");
        setTimeout(() => {
          setModalAbierto(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      mostrarAlerta("error", "Error al Actualizar Stock");
    }
  }

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#3bb48b] rounded-t-lg md:text-xl text-white font-bold p-2">
          <h2>Ajustar Stock del Producto Establecido</h2>
          <button
            className="w-7 h-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalAbierto(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleEdit)}>
          <label className="block text-sm font-medium mb-2">
            Cantidad Disponible
          </label>
          <input
            type="number"
            step="any"
            {...register("cantidad")}
            min="0"
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Escribe la cantidad del producto establecido"
          />

          <label className="block text-sm font-medium mb-2">Motivo</label>
          <input
            type="text"
            {...register("motivo")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Escribe el motivo"
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      <ModalAlerta
        show={alerta.show}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
      />
    </>
  );
}
