import React, { useEffect, useState } from "react";
import TablaProductosEstablecidos from "../components/TablaProductosEstablecidos";
import AgregarProductoEstablecido from "../components/AgregarProductoEstablecido";
import { listaProductosEstablecidos } from "../axios/productos/productos";
import TablaProductosMateriasPrimas from "../components/TablaProductosMateriasPrimas";
import { listaMateriasPrimas } from "../axios/productos/materiasprimas";
import AgregarMateriaPrima from "../components/AgregarMateriaPrima";

export default function Productos() {
  const [modalNuevoProductoEstablecido, setModalNuevoProductoEstablecido] =
    useState(false);
  const [modalNuevoMateriaPrima, setModalNuevoMateriaPrima] = useState(false);
  const [data, setData] = useState([]);
  const [dataMateriaPrima, setDataMateriaPrima] = useState([]);
  const [loadingEstablecidos, setLoadingEstablecidos] = useState(true);
  const [loadingMaterias, setLoadingMaterias] = useState(true);
  const [tablaVisible, setTablaVisible] = useState("establecidos");

  useEffect(() => {
    listaProductosEstablecidos()
      .then((rs) => setData(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingEstablecidos(false));
  }, []);

  useEffect(() => {
    listaMateriasPrimas()
      .then((rs) => setDataMateriaPrima(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingMaterias(false));
  }, []);
  return (
    <div>
      <div className=" py-4 md:flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Administración de Productos</h2>
      </div>

      <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Seleccione Tipo de Producto
        </h2>
        <button
          className={`m-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 ${
            tablaVisible === "establecidos"
              ? "bg-purple-900 text-white font-bold scale-100 ring-4 ring-indigo-300"
              : "bg-[#9c2bf9] text-white hover:bg-[#a45bb0]"
          }`}
          onClick={() => setTablaVisible("establecidos")}
        >
          Productos Establecidos
        </button>
        <button
          className={`m-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 ${
            tablaVisible === "materiasPrimas"
              ? "bg-purple-900 text-white font-bold scale-100 ring-4 ring-indigo-300"
              : "bg-[#9c2bf9] text-white hover:bg-[#a45bb0]"
          }`}
          onClick={() => setTablaVisible("materiasPrimas")}
        >
          Productos Materias Primas
        </button>
      </div>

      {tablaVisible === "establecidos" && (
        <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg w-full">
          <div className="sm:flex sm:justify-end">
            <button
              className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
              onClick={() => setModalNuevoProductoEstablecido(true)}
            >
              <strong className="text-xl">+</strong> Nuevo Producto Establecido
            </button>
          </div>
          {loadingEstablecidos ? (
            <p className="text-center text-lg py-10 text-purple-700">
              Cargando productos establecidos...
            </p>
          ) : (
            <TablaProductosEstablecidos data={data} />
          )}
        </div>
      )}

      {tablaVisible === "materiasPrimas" && (
        <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
          <div className="sm:flex sm:justify-end">
            <button
              className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
              onClick={() => setModalNuevoMateriaPrima(true)}
            >
              <strong className="text-xl">+</strong> Nueva Materia Prima
            </button>
          </div>
          {loadingMaterias ? (
            <p className="text-center text-lg py-10 text-purple-700">
              Cargando materias primas...
            </p>
          ) : (
            <TablaProductosMateriasPrimas data={dataMateriaPrima} />
          )}
        </div>
      )}

      {modalNuevoProductoEstablecido && (
        <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
          <AgregarProductoEstablecido
            setModalNuevoProductoEstablecido={setModalNuevoProductoEstablecido}
          />
        </div>
      )}
      {modalNuevoMateriaPrima && (
        <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
          <AgregarMateriaPrima
            setModalNuevoMateriaPrima={setModalNuevoMateriaPrima}
          />
        </div>
      )}
    </div>
  );
}
