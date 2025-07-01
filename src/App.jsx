import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Sucursales from "./pages/Sucursales";
import Personal from "./pages/Personal";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Inventarios from "./pages/Inventarios";
import Reportes from "./pages/Reportes";
import Predicciones from "./pages/Predicciones";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import RedireccionarPorRol from "./components/RedireccionarPorRol";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<DashboardLayout />}>
        <Route element={<PrivateRoute allowedRoles={[1, 2, 3]} />}>
          <Route index element={<RedireccionarPorRol />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="pedidos" element={<Pedidos />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1, 2]} />}>
          <Route path="inventarios" element={<Inventarios />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="sucursales" element={<Sucursales />} />
          <Route path="personal" element={<Personal />} />
          <Route path="productos" element={<Productos />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="predicciones" element={<Predicciones />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
