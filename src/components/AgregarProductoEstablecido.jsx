import React from "react";
import ModalAlerta from "../components/ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";
import { useForm } from "react-hook-form";
import { crearProductoEstablecido } from "../axios/productos/productos";

export default function AgregarProductoEstablecido({
  setModalNuevoProductoEstablecido,
}) {
  const { register, handleSubmit } = useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();

  async function handleCreate(data) {
    try {
      const status = await crearProductoEstablecido(data);
      if (status === 201) {
        mostrarAlerta("exito", "Producto Creado con Éxito");
        setTimeout(() => {
          setModalNuevoProductoEstablecido(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al Crear producto establecido:", error);
      mostrarAlerta("error", "Error al Crear Producto Establecido");
    }
  }
  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Agregar Producto Establecido</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalNuevoProductoEstablecido(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleCreate)}>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            {...register("nombre")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Nombre del producto"
          />

          <label className="block text-sm font-medium mb-2">Descripción</label>
          <input
            type="text"
            {...register("descripcion")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Descripción del producto"
          />

          <label className="block text-sm font-medium mb-2">
            Precio Unitario
          </label>
          <input
            type="number"
            step="any"
            {...register("precio_unitario")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Precio del producto"
          />

          <label className="block text-sm font-medium mb-2">¿Es Helado?</label>
          <select
            {...register("es_helado")}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="">Seleccione una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              Guardar
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
