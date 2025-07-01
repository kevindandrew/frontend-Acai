import React, { useState } from "react";

export default function useMostrarContraseña() {
  const [mostrar, setMostrar] = useState(false);
  const toggleMostrar = () => setMostrar(!mostrar);

  return { mostrar, toggleMostrar };
}
