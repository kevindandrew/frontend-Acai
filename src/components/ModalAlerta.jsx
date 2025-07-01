import React from "react";

export default function ModalAlerta({ show, tipo, mensaje }) {
  if (!show) return null;
  const bgColor = tipo === "exito" ? "bg-green-500" : "bg-red-500";
  const titulo = tipo === "exito" ? "Éxito" : "Error";

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-[#c8cccb6d] z-70">
      <div className={`rounded-lg shadow-lg p-6 w-80 ${bgColor} text-white`}>
        <h2 className="text-lg font-bold mb-2">{titulo}</h2>
        <p className="mb-4">{mensaje}</p>
      </div>
    </div>
  );
}
