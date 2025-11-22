import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { fetchBarChartsData } from "../api/barChartsApi";
import { LineChartDataBarChart, BarChartData } from "../types/dashboardTypes";

const mockVentas: LineChartDataBarChart[] = [
  { date: "2025-01", value: 1040, otherValue: 3000 },
  { date: "2025-02", value: 890, otherValue: 1000  },
  { date: "2025-03", value: 1360, otherValue: 2000  },
  { date: "2025-04", value: 970, otherValue: 500  },
  { date: "2025-05", value: 1430, otherValue: 10  },
  { date: "2025-06", value: 1120, otherValue: 200  },
];

const mockGastos: BarChartData[] = [
  { category: "Marketing", value: 150 },
  { category: "Operaciones", value: 200 },
  { category: "RRHH", value: 100 },
];

export const BarChartsSection: React.FC = () => {
  const [ventas, setVentas] = useState<LineChartDataBarChart[]>([]);
  const [gastos, setGastos] = useState<BarChartData[]>([]);
  
  useEffect(() => {
    setVentas(mockVentas);
    setGastos(mockGastos);
  }, []);
  /*
  useEffect(() => {
    fetchBarChartsData()
      .then((res) => {
        setVentas(res.ventas);
        setGastos(res.gastos);
      })
      .catch(console.error);
  }, []);
  */
  return (
    <div className="chart-section two">
      <div className="chart-box">
        <h3>Ventas por categoría</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={ventas}>
            <XAxis dataKey="date"             stroke="#ffffff"
            tick={{ fill: "#ffffff" }}/>
            <YAxis
                          stroke="#ffffff"
            tick={{ fill: "#ffffff" }}
            />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#3b4763",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                      />
            <Line dataKey="value" stroke="#ff9800" />
            <Line dataKey="otherValue" stroke="#4caf50" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Gastos por departamento</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={gastos}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
