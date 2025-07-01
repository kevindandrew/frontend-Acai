import { useEffect, useState } from "react";
import TablaClientes from "../components/TablaClientes";
import { listaClientes } from "../axios/clientes/clientes";
import AgregarCliente from "../components/AgregarCliente";

export default function Clientes() {
  const [modalNuevoCliente, setModalNuevoCliente] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    listaClientes()
      .then((rs) => setData(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <div className=" py-4 md:flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Administración de Clientes</h2>
        <button
          className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
          onClick={() => setModalNuevoCliente(true)}
        >
          <strong className="text-xl">+</strong> Nuevo Cliente
        </button>
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Clientes...
          </p>
        ) : (
          <TablaClientes data={data} setData={setData} />
        )}
      </div>
      {modalNuevoCliente && (
        <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
          <AgregarCliente setModalNuevoCliente={setModalNuevoCliente} />
        </div>
      )}
    </div>
  );
}
