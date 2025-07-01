import { useEffect, useState } from "react";
import TablaPersonal from "../components/TablaPersonal";
import { listapersonal, listaSucursales } from "../axios/personal/personal";
import AgregarPersonal from "../components/AgregarPersonal";

export default function Personal() {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [modalNuevoPersonal, setModalNuevoPersonal] = useState(false);
  const [dataSucursales, setDataSucursales] = useState([]);
  const [dataPersonal, setDataPersonal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sucursales, personal] = await Promise.all([
          listaSucursales(),
          listapersonal(),
        ]);
        setDataSucursales(sucursales);
        setDataPersonal(personal);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const personalFiltrado = sucursalSeleccionada
    ? dataPersonal.filter((p) => p.id_sucursal === sucursalSeleccionada)
    : dataPersonal;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administración de Personal</h1>
      <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Sucursales...
          </p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Seleccione una Sucursal
            </h2>
            <button
              className={`m-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 ${
                sucursalSeleccionada === null
                  ? "bg-purple-900 text-white font-bold scale-100 ring-4 ring-indigo-300"
                  : "bg-[#8613e5] text-white hover:bg-[#a45bb0]"
              }`}
              onClick={() => setSucursalSeleccionada(null)}
            >
              Todos
            </button>
            {dataSucursales
              .sort((a, b) => a.id_sucursal - b.id_sucursal)
              .map((sucursal, index) => (
                <button
                  key={index}
                  className={`m-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 ${
                    sucursalSeleccionada === sucursal.id_sucursal
                      ? "bg-purple-900 text-white font-bold scale-100 ring-4 ring-indigo-300"
                      : "bg-[#9c2bf9] text-white hover:bg-[#a45bb0]"
                  }`}
                  onClick={() => setSucursalSeleccionada(sucursal.id_sucursal)}
                >
                  <span>{sucursal.nombre}</span>
                </button>
              ))}
          </div>
        )}
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
        <div className=" md:flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">
            Personal de{" "}
            {sucursalSeleccionada
              ? dataSucursales.find(
                  (s) => s.id_sucursal === sucursalSeleccionada
                )?.nombre
              : "todas las sucursales"}
          </h2>
          <button
            className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
            onClick={() => setModalNuevoPersonal(true)}
          >
            <strong className="text-xl">+</strong> Nueva Personal
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Personal...
          </p>
        ) : (
          <TablaPersonal
            dataPersonal={personalFiltrado}
            dataSucursales={dataSucursales}
          />
        )}
        {modalNuevoPersonal && (
          <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
            <AgregarPersonal
              setModalNuevoPersonal={setModalNuevoPersonal}
              personal={dataPersonal}
              sucursales={dataSucursales}
            />
          </div>
        )}
      </div>
    </div>
  );
}
