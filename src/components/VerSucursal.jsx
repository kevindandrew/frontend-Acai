export default function VerSucursal({ setSucursalVer, sucursal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
        <div className="flex justify-between bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2 className="text-xl font-bold">Detalles de la Sucursal</h2>
          <button
            onClick={() => setSucursalVer(null)}
            className=" text-white hover:font-bold w-7 h-7 bg-[#fe2b2b] hover:bg-red-600 rounded-full cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="space-y-2 p-6">
          <p>
            <span className="font-semibold">Nombre:</span> {sucursal.nombre}
          </p>
          <p>
            <span className="font-semibold">Dirección:</span>{" "}
            {sucursal.direccion}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span> {sucursal.telefono}
          </p>
          <p>
            <span className="font-semibold">Horario de Apertura:</span>{" "}
            {sucursal.horario_apertura}
          </p>
          <p>
            <span className="font-semibold">Horario de Cierre:</span>{" "}
            {sucursal.horario_cierre}
          </p>
          <p>
            <span className="font-semibold">Id Sucursal:</span>{" "}
            {sucursal.id_sucursal}
          </p>
        </div>
      </div>
    </div>
  );
}
