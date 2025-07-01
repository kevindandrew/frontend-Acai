import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../axios/auth/login";
import useMostrarContraseña from "../hooks/useMostrarContraseña";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { mostrar, toggleMostrar } = useMostrarContraseña();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());

    try {
      const res = await login(credentials);
      if (!res.access_token || !res.user) throw new Error("Respuesta inválida");

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="flex flex-col h-screen items-center">
        <div className=" flex items-center justify-center h-30 w-full sm:h-screen">
          <img
            src="fondo-helado3.jpg"
            alt=""
            className=" w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="border-1 border-[#7506b0] flex text-[#5e3873] flex-col justify-center items-center w-75 md:h-auto bg-[#c2feead8] rounded-lg shadow-lg shadow-[#603a75] p-6 sm:w-100 sm:absolute sm:left-1/2 sm:top-30 sm:-translate-x-1/2">
          <img src="logo.jpeg" alt="" className="w-15 rounded-full sm:w-30" />
          <h2 className="text-2xl font-bold mb-6">Bienvenido</h2>
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-[#5e3873] mb-2 ">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                className="border-1 border-[#7506b0] p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
      focus:ring-2 focus:ring-[#3bb48b] pr-12"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className=" block text-sm font-bold text-[#5e3873] mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type={mostrar ? "text" : "password"}
                name="password"
                required
                className="border-1 border-[#7506b0] p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
      focus:ring-2 focus:ring-[#3bb48b] pr-12"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={toggleMostrar}
                className="absolute right-3 top-9 text-sm text-gray-600 hover:text-red-500  cursor-pointer"
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
            {error && (
              <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
            )}
            {loading ? (
              <button
                type="button"
                className="w-full py-2 px-4 rounded-md bg-[#c87bcf95] text-[#1d1c1d] border border-[#560a5d95] cursor-not-allowed"
                disabled
              >
                Cargando...
              </button>
            ) : (
              <button
                type="submit"
                className="font-bold w-full py-2 px-4 rounded-md bg-green-400 hover:bg-green-500 text-[#1d1c1d] border border-[#560a5d95] cursor-pointer"
              >
                INICIAR SESIÓN
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
