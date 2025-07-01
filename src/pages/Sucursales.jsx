import { useEffect, useState } from "react";
import TablaSucursales from "../components/TablaSucursales";
import AgregarSucursal from "../components/AgregarSucursal";
import { listaSucursales } from "../axios/sucursales/sucursales";

export default function Sucursales() {
  const [modalNuevoSucursal, setModalNuevoSucursal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    listaSucursales()
      .then((rs) => setData(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <div className=" py-4 md:flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          Administración de Sucursales
        </h2>
        <button
          className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
          onClick={() => setModalNuevoSucursal(true)}
        >
          <strong className="text-xl">+</strong> Nueva Sucursal
        </button>
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando sucursales...
          </p>
        ) : (
          <TablaSucursales data={data} setData={setData} />
        )}
      </div>
      {modalNuevoSucursal && (
        <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center ">
          <AgregarSucursal setModalNuevoSucursal={setModalNuevoSucursal} />
        </div>
      )}
    </div>
  );
}
