import React, { useEffect, useState } from "react";
import TablaInventariosMateriasPrimas from "../components/TablaInventariosMateriasPrimas";
import {
  listaInventariosMateriasPrimas,
  listaSucursales,
} from "../axios/inventarios/inventarioMateriasPrimas";
import { listaInventarioProductosEstablecidos } from "../axios/inventarios/inventarioProductosEstablecidos";
import TablaInventarioProductosEstablecidos from "../components/TablaInventarioProductosEstablecidos";
import TransferirProductoEstablecido from "../components/TransferirProductoEstablecido";
import AsignarMateriaPrimaSucursal from "../components/AsignarMateriaPrimaSucursal";
import AsignarProductoEstablecidoSucursal from "../components/AsignarProductoEstablecidoSucursal";

export default function Inventarios() {
  const [modalNuevoProductoEstablecido, setModalNuevoProductoEstablecido] =
    useState(false);
  const [modalNuevoMateriaPrima, setModalNuevoMateriaPrima] = useState(false);
  const [
    modalTransferirProductoEstablecido,
    setModalTransferirProductoEstablecido,
  ] = useState(false);
  const [dataProductosEstablecidos, setDataProductosEstablecidos] = useState(
    []
  );
  const [dataMateriaPrima, setDataMateriaPrima] = useState([]);
  const [loadingEstablecidos, setLoadingEstablecidos] = useState(true);
  const [loadingMaterias, setLoadingMaterias] = useState(true);
  const [tablaVisible, setTablaVisible] = useState("establecidos");
  const [dataSucursales, setDataSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [loadingSucursales, setLoadingSucursales] = useState(true);

  useEffect(() => {
    listaSucursales()
      .then((rs) => {
        setDataSucursales(rs);
        setSucursalSeleccionada(1);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingSucursales(false));
  }, []);
  useEffect(() => {
    if (!sucursalSeleccionada) return;

    setLoadingEstablecidos(true);
    listaInventarioProductosEstablecidos(sucursalSeleccionada)
      .then((rs) => setDataProductosEstablecidos(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingEstablecidos(false));
  }, [sucursalSeleccionada]);

  useEffect(() => {
    if (!sucursalSeleccionada) return;

    setLoadingMaterias(true);
    listaInventariosMateriasPrimas(sucursalSeleccionada)
      .then((rs) => setDataMateriaPrima(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingMaterias(false));
  }, [sucursalSeleccionada]);
  const obtenerNombreSucursal = (id) => {
    return (
      dataSucursales.find((s) => s.id_sucursal === id)?.nombre ||
      "Sucursal desconocida"
    );
  };

  return (
    <div>
      <div className=" py-4 md:flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          Administración de Inventario
        </h2>
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
        {loadingSucursales ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Sucursales...
          </p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Seleccione una Sucursal
            </h2>

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
          <h2 className="text-xl font-semibold mb-2">
            Inventario de{" "}
            {tablaVisible === "establecidos"
              ? "Productos Establecidos"
              : "Materias Primas"}{" "}
            en {obtenerNombreSucursal(sucursalSeleccionada)}
          </h2>
          <div className="flex flex-wrap gap-2 justify-end">
            <button
              className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
              onClick={() => setModalNuevoProductoEstablecido(true)}
            >
              <strong className="text-xl">+</strong> Asignar Producto
              Establecido
            </button>
            <button
              className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
              onClick={() => setModalTransferirProductoEstablecido(true)}
            >
              Transferir Producto Establecido
            </button>
          </div>

          {loadingEstablecidos ? (
            <p className="text-center text-lg py-10 text-purple-700">
              Cargando productos establecidos...
            </p>
          ) : (
            <TablaInventarioProductosEstablecidos
              data={dataProductosEstablecidos}
              sucursales={dataSucursales}
            />
          )}
        </div>
      )}

      {tablaVisible === "materiasPrimas" && (
        <div className="mb-6 shadow-lg p-4 bg-[#3bb48c38] rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Inventario de{" "}
            {tablaVisible === "establecidos"
              ? "Productos Establecidos"
              : "Materias Primas"}{" "}
            en {obtenerNombreSucursal(sucursalSeleccionada)}
          </h2>
          <div className="sm:flex sm:justify-end">
            <button
              className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600 hover:scale-103"
              onClick={() => setModalNuevoMateriaPrima(true)}
            >
              <strong className="text-xl">+</strong> Asignar Materia Prima
            </button>
          </div>
          {loadingMaterias ? (
            <p className="text-center text-lg py-10 text-purple-700">
              Cargando materias primas...
            </p>
          ) : (
            <TablaInventariosMateriasPrimas
              data={dataMateriaPrima}
              sucursales={dataSucursales}
            />
          )}
        </div>
      )}
      {modalTransferirProductoEstablecido && (
        <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
          <TransferirProductoEstablecido
            setModalTransferirProductoEstablecido={
              setModalTransferirProductoEstablecido
            }
            sucursales={dataSucursales}
            origenSeleccionado={sucursalSeleccionada}
            productosEstablecidos={dataProductosEstablecidos}
          />
        </div>
      )}
      {modalNuevoProductoEstablecido && (
        <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
          <AsignarProductoEstablecidoSucursal
            setModalNuevoProductoEstablecido={setModalNuevoProductoEstablecido}
            origenSeleccionado={sucursalSeleccionada}
            sucursales={dataSucursales}
          />
        </div>
      )}
      {modalNuevoMateriaPrima && (
        <div className="fixed inset-0 bg-[#aea7b46d] flex items-center justify-center">
          <AsignarMateriaPrimaSucursal
            setModalNuevoMateriaPrima={setModalNuevoMateriaPrima}
            sucursales={dataSucursales}
            origenSeleccionado={sucursalSeleccionada}
          />
        </div>
      )}
    </div>
  );
}
