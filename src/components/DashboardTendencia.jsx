import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardTendencia({ dataTendencia }) {
  const datos = dataTendencia?.map((item) => ({
    producto: item.producto,
    crecimiento: Number(item.crecimiento * -1),
    ventasRecientes: Number(item.ventas_recientes),
    ventasAnteriores: Number(item.ventas_anteriores),
  }));

  return (
    <div className="p-2">
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-purple-100 w-150">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={datos}
            margin={{ top: 20, right: 30, left: 0, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="producto"
              angle={0}
              textAnchor="end"
              interval={0}
              height={20}
            />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="ventasAnteriores"
              fill="#a78bfa"
              name="Ventas Anteriores"
            />
            <Bar
              dataKey="ventasRecientes"
              fill="#7c3aed"
              name="Ventas Recientes"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
