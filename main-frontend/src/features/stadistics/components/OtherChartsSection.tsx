import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { fetchOtherChartsData } from "../api/otherChartsApi";
import { PieChartData, LineChartData } from "../types/dashboardTypes";

// Mock data
const mockPie: PieChartData[] = [
  { name: "Cliente A", value: 400 },
  { name: "Cliente B", value: 300 },
  { name: "Cliente C", value: 300 },
];

const mockMiniLine: LineChartData[] = [
  { date: "2025-01", value: 200 },
  { date: "2025-02", value: 250 },
  { date: "2025-03", value: 180 },
  { date: "2025-04", value: 300 },
];

const mockMapData = [
  { region: "Norte", lat: 10, lon: 20 },
  { region: "Sur", lat: 50, lon: 40 },
  { region: "Este", lat: 30, lon: 60 },
];

export const OtherChartsSection: React.FC = () => {
  const [pieData, setPieData] = useState<PieChartData[]>([]);
  const [miniLine, setMiniLine] = useState<LineChartData[]>([]);
  //const [mapData, setMapData] = useState<{ region: string; lat: number; lon: number }[]>([]);
  const [mapData, setMapData] = useState(mockMapData);
  useEffect(() => {
    setPieData(mockPie);
    setMiniLine(mockMiniLine);
  }, []);
  /*
  useEffect(() => {
    fetchOtherChartsData().then((res) => {
      setPieData(res.pie);
      setMiniLine(res.miniLine);
      setMapData(res.map);
    });
  }, []);
  */
  return (
    <div className="chart-section three">
      <div className="chart-box">
        <h3>Distribución de clientes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={["#4caf50", "#2196f3", "#ff9800"][i % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Tendencia de usuarios</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={miniLine}>
            <Line type="monotone" dataKey="value" stroke="#4caf50" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Regiones activas</h3>
        <div className="map-placeholder">
          {mapData.map((p, i) => (
            <div
              key={i}
              className="map-dot"
              style={{
                top: `${30 + i * 10}%`,
                left: `${40 + i * 15}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
