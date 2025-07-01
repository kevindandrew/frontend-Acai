import React, { useEffect, useState } from "react";

import {
  reportesClientesFrecuentes,
  reportesMasVendidos,
  reportesMateriasMasUsadas,
  reportesSucursalesTop,
  reportesVentasPorHorario,
} from "../axios/reportes/reportes";

export default function Reportes() {
  const [dataMasVendidos, setDataMasVendidos] = useState([]);
  const [dataSucursalesTop, setDataSucursalesTop] = useState([]);
  const [dataMateriasMasUsadas, setDataMateriasMasUsadas] = useState([]);
  const [dataClientesFrecuentes, setDataClientesFrecuentes] = useState([]);
  const [dataVentasPorHorario, setDataVentasPorHorario] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    reportesMasVendidos()
      .then((rs) => setDataMasVendidos(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    reportesSucursalesTop()
      .then((rs) => setDataSucursalesTop(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    reportesMateriasMasUsadas()
      .then((rs) => setDataMateriasMasUsadas(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    reportesClientesFrecuentes()
      .then((rs) => setDataClientesFrecuentes(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    reportesVentasPorHorario()
      .then((rs) => setDataVentasPorHorario(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-purple-700 font-semibold text-center mt-10">
          Cargando reportes...
        </p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Reportes</h1>
          <div className="flex flex-wrap gap-5 justify-center">
            <div className="w-65 bg-[#3bb48c38] p-3 rounded-2xl shadow-md mt-3 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                🍨 Productos Más Vendidos
              </h2>
              <ul className="space-y-4">
                {dataMasVendidos?.data?.map((item, index) => (
                  <li key={index} className="bg-white rounded-xl p-3 shadow-md">
                    <strong className="text-xl text-purple-900">
                      {index + 1}. {item.producto}
                    </strong>
                    <p className="text-purple-700 mt-1">
                      Unidades vendidas: {item.unidades_vendidas}
                    </p>
                    <p className="text-purple-700">
                      Ingresos: {item.ingresos} Bs
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-65 bg-[#3bb48c38] p-3 rounded-2xl shadow-md mt-3 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                🏪 Sucursales TOP
              </h2>
              <ul className="space-y-4">
                {dataSucursalesTop?.data?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-xl p-3 shadow-md "
                  >
                    <strong className="text-xl text-purple-900">
                      {index + 1}. {item.sucursal}
                    </strong>
                    <p className="text-purple-700 mt-1">
                      Total pedidos: {item.total_pedidos}
                    </p>
                    <p className="text-purple-700">
                      Ventas totales: {item.ventas_totales} Bs
                    </p>
                    <p className="text-purple-700">
                      Promedio por pedido: {item.promedio_por_pedido} Bs
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-65 bg-[#3bb48c38] p-3 rounded-2xl shadow-md mt-3 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                🍇 Materias Primas Más Usadas
              </h2>
              <ul className="space-y-4">
                {dataMateriasMasUsadas?.data?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-xl p-3 shadow-md "
                  >
                    <strong className="text-xl text-purple-900">
                      {index + 1}.{item.materia_prima}
                    </strong>
                    <p className="text-purple-700 mt-1">
                      Total utilizado: {item.total_utilizado} {item.unidad}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-65 bg-[#3bb48c38] p-3 rounded-2xl shadow-md mt-3 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                🧑‍🤝‍🧑 Clientes Frecuentes
              </h2>
              <ul className="space-y-4">
                {dataClientesFrecuentes?.data?.map((item, index) => (
                  <li key={index} className="bg-white rounded-xl p-3 shadow-md">
                    <strong className="text-xl text-purple-900">
                      {index + 1}.{item.apellido} (CI/NIT: {item.ci_nit})
                    </strong>
                    <p className="text-purple-700 mt-1">
                      Total pedidos: {item.total_pedidos}
                    </p>
                    <p className="text-purple-700">
                      Total gastado: {item.total_gastado} Bs
                    </p>
                    <p className="text-purple-700">
                      Promedio por pedido: {item.promedio_por_pedido} Bs
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
