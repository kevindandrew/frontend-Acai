// Reportes.jsx (moderno con gráficas y tarjetas)
import React, { useEffect, useState } from "react";
import {
  reportesClientesFrecuentes,
  reportesMasVendidos,
  reportesMateriasMasUsadas,
  reportesSucursalesTop,
  reportesVentasPorHorario,
} from "../axios/reportes/reportes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

export default function Reportes() {
  const [dataMasVendidos, setDataMasVendidos] = useState([]);
  const [dataSucursalesTop, setDataSucursalesTop] = useState([]);
  const [dataMateriasMasUsadas, setDataMateriasMasUsadas] = useState([]);
  const [dataClientesFrecuentes, setDataClientesFrecuentes] = useState([]);
  const [dataVentasPorHorario, setDataVentasPorHorario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      reportesMasVendidos(),
      reportesSucursalesTop(),
      reportesMateriasMasUsadas(),
      reportesClientesFrecuentes(),
      reportesVentasPorHorario(),
    ])
      .then(([vendidos, sucursales, materias, clientes, horarios]) => {
        setDataMasVendidos(vendidos.data);
        setDataSucursalesTop(sucursales.data);
        setDataMateriasMasUsadas(materias.data);
        setDataClientesFrecuentes(clientes.data);
        setDataVentasPorHorario(horarios.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Reportes</h1>

      {loading ? (
        <p className="text-purple-700 font-semibold text-center mt-10">
          Cargando reportes...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Productos más vendidos */}
          <div className="bg-white rounded-2xl shadow-md p-4 border-t-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-800 mb-4 text-center">
              🍨 Productos Más Vendidos
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={dataMasVendidos}
                layout="vertical"
                margin={{ left: 50 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="producto" />
                <Tooltip />
                <Bar dataKey="unidades_vendidas" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Materias primas más usadas */}
          <div className="bg-white rounded-2xl shadow-md p-4 border-t-4 border-green-500">
            <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
              🍇 Materias Primas Más Usadas
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataMateriasMasUsadas}
                  dataKey="total_utilizado"
                  nameKey="materia_prima"
                  outerRadius={80}
                  label
                >
                  {dataMateriasMasUsadas.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Ventas por horario */}
          <div className="bg-white rounded-2xl shadow-md p-4 border-t-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">
              ⏰ Ventas por Horario
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataVentasPorHorario}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="franja_horaria" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="ventas_totales"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Sucursales top */}
          <div className="bg-white rounded-2xl shadow-md p-4 border-t-4 border-yellow-500">
            <h2 className="text-xl font-bold text-yellow-800 mb-4 text-center">
              🏪 Sucursales TOP
            </h2>
            <ul className="space-y-3">
              {dataSucursalesTop.map((item, i) => (
                <li key={i} className="bg-yellow-50 p-3 rounded-xl shadow-sm">
                  <p className="font-semibold text-yellow-700">
                    #{i + 1} {item.sucursal}
                  </p>
                  <p className="text-sm">Pedidos: {item.total_pedidos}</p>
                  <p className="text-sm">Ventas: {item.ventas_totales} Bs</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Clientes frecuentes */}
          <div className="bg-white rounded-2xl shadow-md p-4 border-t-4 border-pink-500">
            <h2 className="text-xl font-bold text-pink-800 mb-4 text-center">
              🧑‍🤝‍🧑 Clientes Frecuentes
            </h2>
            <ul className="space-y-3">
              {dataClientesFrecuentes.map((item, i) => (
                <li key={i} className="bg-pink-50 p-3 rounded-xl shadow-sm">
                  <p className="font-semibold text-pink-700">
                    #{i + 1} {item.apellido} (CI: {item.ci_nit})
                  </p>
                  <p className="text-sm">Pedidos: {item.total_pedidos}</p>
                  <p className="text-sm">Gastado: {item.total_gastado} Bs</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
