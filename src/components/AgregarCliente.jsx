import ModalAlerta from "../components/ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";
import { useForm } from "react-hook-form";
import { crearCliente } from "../axios/clientes/clientes";

export default function AgregarCliente({ setModalNuevoCliente }) {
  const { register, handleSubmit } = useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();

  async function handleCreate(data) {
    try {
      const status = await crearCliente(data);
      if (status === 201) {
        mostrarAlerta("exito", "Cliente Creado con Éxito");
        setTimeout(() => {
          setModalNuevoCliente(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al Crear cliente:", error);
      if (error.response && error.response.status === 400) {
        mostrarAlerta("error", "El Cliente ya Existe.");
      } else {
        mostrarAlerta("error", "Error Crear Cliente");
      }
    }
  }
  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between items-center bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Nuevo Cliente</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalNuevoCliente(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleCreate)}>
          <label className="block text-sm font-medium mb-2">Apellido</label>
          <input
            type="text"
            {...register("apellido")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
  focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Apellido del cliente"
          />

          <label className="block text-sm font-medium mb-2">CI o NIT</label>
          <input
            type="text"
            {...register("ci_nit")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
  focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Numero de CI o NIT "
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
