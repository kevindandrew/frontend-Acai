import React from "react";

export default function VerProductoEstablecido({
  setModalAbierto,
  productoestablecido,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
        <div className="flex justify-between bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2 className="text-xl font-bold">
            Detalles de la Producto Establecido
          </h2>
          <button
            onClick={() => setModalAbierto(null)}
            className=" w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="space-y-2 p-6">
          <p>
            <span className="font-semibold">Producto:</span>{" "}
            {productoestablecido.nombre}
          </p>
          <p>
            <span className="font-semibold">Descripción:</span>{" "}
            {productoestablecido.descripcion}
          </p>
          <p>
            <span className="font-semibold">Precio:</span>{" "}
            {productoestablecido.precio_unitario} Bs
          </p>
          <p>
            <span className="font-semibold">Es helado?:</span>{" "}
            {productoestablecido.es_helado === true ? "Si" : "No"}
          </p>
          <p>
            <span className="font-semibold">Id del Producto:</span>{" "}
            {productoestablecido.id_producto_establecido}
          </p>
        </div>
      </div>
    </div>
  );
}
