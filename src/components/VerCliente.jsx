export default function VerCliente({ setClienteVer, cliente }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
        <div className="flex justify-between bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2 className="text-xl font-bold">Detalles del Cliente</h2>
          <button
            onClick={() => setClienteVer(null)}
            className=" w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="space-y-2 p-6">
          <p>
            <span className="font-semibold">Apellido:</span> {cliente.apellido}
          </p>
          <p>
            <span className="font-semibold">CI o NIT:</span> {cliente.ci_nit}
          </p>
          <p>
            <span className="font-semibold">Fecha de Registro:</span>{" "}
            {new Date(cliente.fecha_registro).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Id_cliente:</span>{" "}
            {cliente.id_cliente}
          </p>
        </div>
      </div>
    </div>
  );
}
