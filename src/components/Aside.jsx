import { Link, useLocation } from "react-router-dom";
import { user } from "../axios/aside/aside";
import { useEffect, useState } from "react";

export default function Aside({ openMenu }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    user()
      .then((rs) => setData(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const idRol = data?.id_rol;
  return (
    <aside
      className={`${
        openMenu ? "block" : "hidden"
      } md:block absolute right-0 top-18 md:top-0 h-auto w-45 shrink-0 flex-none rounded-2xl bg-[#804193d2] font-semibold cursor-pointer md:rounded-none  md:relative md:w-45 md:h-auto md:bg-[#613b76] text-[#fefffc] p-4 overflow-y-auto z-50`}
    >
      <nav className="space-y-2 flex flex-col">
        {idRol === 1 && (
          <Link
            to="/sucursales"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/sucursales"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Sucursales
          </Link>
        )}

        {idRol === 1 && (
          <Link
            to="/personal"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/personal"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Personal
          </Link>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3) && (
          <Link
            to="/clientes"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/clientes"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Clientes
          </Link>
        )}

        {idRol === 1 && (
          <Link
            to="/productos"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/productos"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Productos
          </Link>
        )}

        {(idRol === 1 || idRol === 2) && (
          <Link
            to="/inventarios"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/inventarios"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Inventarios
          </Link>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3) && (
          <Link
            to="/pedidos"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/pedidos"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Pedidos
          </Link>
        )}

        {idRol === 1 && (
          <Link
            to="/reportes"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/reportes"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Reportes
          </Link>
        )}

        {idRol === 1 && (
          <Link
            to="/predicciones"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === "/predicciones"
                ? "bg-green-400 text-white font-bold"
                : "hover:bg-[#a45bb0] text-white"
            }`}
          >
            ⚽ Predicciones
          </Link>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className=" font-bold px-1 py-2 rounded-md hover:bg-red-500 hover:text-white cursor-pointer"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
