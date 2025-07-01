import React from "react";
import { Navigate } from "react-router-dom";

export default function RedireccionarPorRol() {
  const user = JSON.parse(localStorage.getItem("user"));
  const id_rol = user?.id_rol;

  if (id_rol === 1) return <Navigate to="/sucursales" replace />;
  if (id_rol === 2) return <Navigate to="/clientes" replace />;
  if (id_rol === 3) return <Navigate to="/clientes" replace />;

  return <Navigate to="/unauthorized" replace />;
}
