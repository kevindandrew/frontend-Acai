import { useForm } from "react-hook-form";
import { crearSucursal } from "../axios/sucursales/sucursales";
import ModalAlerta from "../components/ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";

export default function AgregarSucursal({ setModalNuevoSucursal }) {
  const { register, handleSubmit } = useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();

  async function handleCreate(data) {
    try {
      const status = await crearSucursal(data);
      if (status === 201) {
        mostrarAlerta("exito", "Sucursal Creada con Éxito");
        setTimeout(() => {
          setModalNuevoSucursal(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al Crear sucursal:", error);
      mostrarAlerta("error", "Error al Crear Sucursal");
    }
  }
  return (
    <>
      <div className="w-100  rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between items-center bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Nueva Sucursal</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer "
            onClick={() => setModalNuevoSucursal(false)}
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
            placeholder="Nombre de la sucursal"
          />

          <label className="block text-sm font-medium mb-2">Ubicación</label>
          <input
            type="text"
            {...register("direccion")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Ubicación de la sucursal"
          />

          <label className="block text-sm font-medium mb-2">Teléfono</label>
          <input
            type="text"
            {...register("telefono")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Número de teléfono"
          />

          <label className="block text-sm font-medium mb-2">
            Horario Apertura
          </label>
          <input
            type="time"
            {...register("horario_apertura")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Horario de apertura"
          />

          <label className="block text-sm font-medium mb-2">
            Horario Cierre
          </label>
          <input
            type="time"
            {...register("horario_cierre")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Horario de cierre"
          />
          <div className="flex justify-end mt-4" typeof="submit">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
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
