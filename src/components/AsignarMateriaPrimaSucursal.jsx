import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalAlerta from "./ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";
import {
  asignarInventarioMateriaPrima,
  listaMateriasPrimas,
} from "../axios/inventarios/inventarioMateriasPrimas";

export default function AsignarMateriaPrimaSucursal({
  setModalNuevoMateriaPrima,
  sucursales,
  origenSeleccionado,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id_sucursal: origenSeleccionado,
      id_materia_prima: "",
      cantidad_inicial: "",
    },
  });
  const { alerta, mostrarAlerta } = useModalAlerta();
  const [dataMateriasPrimas, setDataMateriasPrimas] = useState([]);
  const [loadingMaterias, setLoadingMaterias] = useState(true);

  async function handleCreate(data) {
    try {
      const status = await asignarInventarioMateriaPrima(data);
      if (status === 200) {
        mostrarAlerta("exito", "Se Asigno Materia Prima con Éxito");
        setTimeout(() => {
          setModalNuevoMateriaPrima(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al Asignar Materia Prima:", error);
      if (error.response && error.response.status === 400) {
        mostrarAlerta("error", "La Materia Prima ya Existe en la Sucursal.");
      } else {
        mostrarAlerta("error", "Error al asignar Materia Prima");
      }
    }
  }

  useEffect(() => {
    listaMateriasPrimas()
      .then((rs) => setDataMateriasPrimas(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingMaterias(false));
  }, []);

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#3bb48b] rounded-t-lg md:text-xl text-white font-bold p-2">
          <h2>Asignar Materia Prima</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalNuevoMateriaPrima(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleCreate)}>
          <label className="block text-sm font-medium mb-2">
            Sucursal destinada:
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
            Materia Prima:
          </label>
          <select
            {...register("id_materia_prima")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="">Seleccione una Materia Prima</option>
            {dataMateriasPrimas.map((mp) => (
              <option key={mp.id_materia_prima} value={mp.id_materia_prima}>
                {mp.nombre}
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
            placeholder="Escriba la cantidad Inicial"
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
