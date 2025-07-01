import React, { useEffect, useState } from "react";
import ModalAlerta from "./ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";
import { useForm } from "react-hook-form";
import {
  asignarInventarioProductoEstablecido,
  listaProductosEstablecidos,
} from "../axios/inventarios/inventarioProductosEstablecidos";

export default function AsignarProductoEstablecidoSucursal({
  setModalNuevoProductoEstablecido,
  origenSeleccionado,
  sucursales,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id_sucursal: origenSeleccionado,
      id_producto_establecido: "",
      cantidad_inicial: "",
    },
  });
  const { alerta, mostrarAlerta } = useModalAlerta();
  const [dataProductosEstablecidos, setDataProductosEstablecidos] = useState(
    []
  );
  const [loadingProductosEstablecidos, setLoadingProductosEstablecidos] =
    useState(true);

  async function handleCreate(data) {
    try {
      const status = await asignarInventarioProductoEstablecido(data);
      if (status === 200) {
        mostrarAlerta("exito", "Se Asigno el Producto Establecido con Éxito");
        setTimeout(() => {
          setModalNuevoProductoEstablecido(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al asignar producto establecido:", error);
      if (error.response && error.response.status === 400) {
        mostrarAlerta(
          "error",
          "El Producto Establecido ya Existe en la Sucursal."
        );
      } else {
        mostrarAlerta("error", "Error al asignar Producto Establecido");
      }
    }
  }

  useEffect(() => {
    listaProductosEstablecidos()
      .then((rs) => setDataProductosEstablecidos(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingProductosEstablecidos(false));
  }, []);

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#3bb48b] rounded-t-lg md:text-xl text-white font-bold p-2">
          <h2>Asignar Producto Establecido</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalNuevoProductoEstablecido(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleCreate)}>
          <label className="block text-sm font-medium mb-2">
            Sucursal Destinada:
          </label>
          <input type="hidden" {...register("id_sucursal")} />
          <p className="text-[#3bb48b]">
            <strong>
              {
                sucursales.find((s) => s.id_sucursal === origenSeleccionado)
                  ?.nombre
              }
            </strong>
          </p>
          <label className="block text-sm font-medium mb-2">
            Producto Establecido:
          </label>
          <select
            {...register("id_producto_establecido")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="">Seleccione un Producto Establecido</option>
            {dataProductosEstablecidos.map((pe) => (
              <option
                key={pe.id_producto_establecido}
                value={pe.id_producto_establecido}
              >
                {pe.nombre}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-2">
            Cantidad Inicial:
          </label>
          <input
            type="number"
            step="any"
            {...register("cantidad_inicial")}
            min="0"
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Escriba la cantidad a asignar"
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
