import { useState, useCallback } from "react";

export function useModalAlerta() {
  const [alerta, setAlerta] = useState({
    show: false,
    tipo: "",
    mensaje: "",
  });

  const mostrarAlerta = useCallback((tipo, mensaje) => {
    setAlerta({ show: true, tipo, mensaje });
    setTimeout(() => {
      setAlerta((prev) => ({ ...prev, show: false }));
    }, 2000);
  }, []);

  return { alerta, mostrarAlerta };
}
