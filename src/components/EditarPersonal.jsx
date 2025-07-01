import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { editarPersonal } from "../axios/personal/personal";
import useMostrarContraseña from "../hooks/useMostrarContraseña";
import { useModalAlerta } from "../hooks/useModalAlerta";
import ModalAlerta from "../components/ModalAlerta";

export default function EditarPersonal({
  setModalAbierto,
  personal,
  sucursales,
}) {
  const { register, reset, handleSubmit } = useForm();
  const { mostrar, toggleMostrar } = useMostrarContraseña();
  const { alerta, mostrarAlerta } = useModalAlerta();

  useEffect(() => {
    if (personal) {
      reset({
        nombre: personal.nombre,
        usuario: personal.usuario,
        contraseña: personal.contraseña,
        id_rol: personal.id_rol,
        id_sucursal: personal.id_sucursal,
      });
    }
  }, [personal, reset]);
  async function handleEdit(requestData) {
    try {
      if (requestData.id_sucursal === "todas") {
        requestData.id_sucursal = null;
      }
      const status = await editarPersonal(requestData, personal.id_personal);
      if (status === 200) {
        mostrarAlerta("exito", "Personal Editado con Éxito");
        setTimeout(() => {
          setModalAbierto(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al editar los datos de la persona:", error);
      mostrarAlerta("error", "Error al Editar Personal");
    }
  }

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Editar Datos de la Persona</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalAbierto(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleEdit)}>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            {...register("nombre")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
  focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Nombre Completo"
          />

          <label className="block text-sm font-medium mb-2">Usuario</label>
          <input
            type="text"
            {...register("usuario")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
  focus:ring-2 focus:ring-[#3bb48b]"
            placeholder="Nombre de usuario"
          />

          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <div className="relative">
            <input
              type={mostrar ? "text" : "password"}
              {...register("contraseña")}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#3bb48b] pr-12"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={toggleMostrar}
              className="absolute right-2 top-2 text-sm text-gray-600 hover:text-red-500  cursor-pointer"
            >
              {mostrar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="red"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          <label className="block text-sm font-medium mb-2">
            Rol del usuario
          </label>
          <select
            {...register("id_rol")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
  focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="1">Administrador</option>
            <option value="2">Encargado de Sucursal</option>
            <option value="3">Vendedor</option>
          </select>

          <label className="block text-sm font-medium mb-2">Id_sucursal</label>
          <select
            {...register("id_sucursal")}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
  focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="todas">Todas</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
                {sucursal.nombre}
              </option>
            ))}
          </select>
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
