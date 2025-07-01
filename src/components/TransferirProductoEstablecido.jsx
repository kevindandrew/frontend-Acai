import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModalAlerta } from "../hooks/useModalAlerta";
import { transferirInventarioProductoEstablecido } from "../axios/inventarios/inventarioProductosEstablecidos";
import ModalAlerta from "./ModalAlerta";

export default function TransferirProductoEstablecido({
  setModalTransferirProductoEstablecido,
  sucursales,
  productosEstablecidos,
  origenSeleccionado,
}) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      id_sucursal_origen: origenSeleccionado,
      id_sucursal_destino: "",
      id_producto_establecido: "",
      cantidad: "",
      motivo: "",
    },
  });
  const { alerta, mostrarAlerta } = useModalAlerta();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const sucursalNombre = sucursales.find(
    (s) => s.id_sucursal === origenSeleccionado
  )?.nombre;
  const idSucursalOrigen = watch("id_sucursal_origen");

  useEffect(() => {
    if (!idSucursalOrigen) {
      setProductosFiltrados([]);
      setValue("id_producto_establecido", "");
      return;
    }
    const filtrados = productosEstablecidos.filter(
      (p) => p.id_sucursal === Number(idSucursalOrigen)
    );
    setProductosFiltrados(filtrados);
    setValue("id_producto_establecido", "");
  }, [idSucursalOrigen, productosEstablecidos, setValue]);

  async function handleTransferir(data) {
    try {
      const status = await transferirInventarioProductoEstablecido(data);
      if (status === 200) {
        mostrarAlerta("exito", "Se Transfirio Producto Establecido con Éxito");
        setTimeout(() => {
          setModalTransferirProductoEstablecido(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al Transferir producto establecido:", error);
      if (error.response && error.response.status === 400) {
        mostrarAlerta("error", "Elige una sucursal diferente.");
      } else {
        mostrarAlerta("error", "Error al Transferir Producto Establecido");
      }
    }
  }

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#3bb48b] rounded-t-lg md:text-xl text-white font-bold p-2">
          <h2>Transferir Producto Establecido</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalTransferirProductoEstablecido(false)}
          >
            X
          </button>
        </div>

        <form
          className="p-4 space-y-4"
          onSubmit={handleSubmit(handleTransferir)}
        >
          <label className="block text-sm font-medium mb-2">
            Sucursal Origen:
          </label>
          <input
            type="hidden"
            {...register("id_sucursal_origen")}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
      focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Escriba la cantidad a asignar"
          />
          <p className="text-[#3bb48b]">
            <strong>{sucursalNombre}</strong>
          </p>

          <label className="block text-sm font-medium mb-2">
            Sucursal Destinada:
          </label>
          <select
            {...register("id_sucursal_destino")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
      focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="">Seleccione Sucursal</option>
            {sucursales.map((s) => (
              <option key={s.id_sucursal} value={s.id_sucursal}>
                {s.nombre}
              </option>
            ))}
          </select>
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
            {productosFiltrados.map((pe) => (
              <option
                key={pe.id_producto_establecido}
                value={pe.id_producto_establecido}
              >
                {pe.nombre}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-2">Cantidad:</label>
          <input
            type="number"
            step="any"
            {...register("cantidad")}
            min="0"
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
      focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Escriba la cantidad a asignar"
          />
          <label className="block text-sm font-medium mb-2">Motivo:</label>
          <input
            type="text"
            {...register("motivo")}
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
