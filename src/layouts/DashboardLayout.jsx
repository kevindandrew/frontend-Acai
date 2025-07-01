import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Aside from "../components/Aside";

export default function DashboardLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const toggleMenu = () => setOpenMenu((prev) => !prev);

  if (checkingAuth) return <div className="p-8 text-center">Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar toggleMenu={toggleMenu} />
      <div className="flex flex-col md:flex-row mx-auto">
        <Aside openMenu={openMenu} />
        <main className="flex-1 p-4 overflow-auto min-h-screen bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
