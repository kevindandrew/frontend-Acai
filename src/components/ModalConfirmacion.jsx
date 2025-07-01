export default function ModalConfirmacion({
  mensaje,
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="fixed inset-0 bg-[#aea7b46d] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg text-center max-w-sm w-full">
        <div className="bg-[#3bb48b] p-3 text-white font-bold">Eliminar</div>
        <p className="mb-4 text-lg px-4">{mensaje}</p>
        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={onCancelar}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:font-bold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:font-bold  cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
