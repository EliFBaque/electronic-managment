import React, { useEffect, useState } from "react";
import { fetchKPIs } from "../api/kpiApi";
import { KPI } from "../types/dashboardTypes";

const mockKPIs: KPI[] = [
  { title: "Total Acumulado", value: 1200 },
  { title: "Total Anual", value: 350 },
  { title: "Total Mensual", value: 75 },
  { title: "Arreglos Mensuales", value: 540 },
];

export const KPISection: React.FC = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);

  useEffect(() => {
    setTimeout(() => setKpis(mockKPIs), 500);
    //fetchKPIs().then(setKpis).catch(console.error);
  }, []);

  return (
    <div className="kpi-container">
      {kpis.map((kpi, i) => (
        <div className="kpi-box" key={i}>
          <span className="kpi-title">{kpi.title}</span>
          <span className="kpi-value">{kpi.value}</span>
        </div>
      ))}
    </div>
  );
};
