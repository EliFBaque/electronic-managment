import React from "react";
import "./styles/Dashboard.css";
import { KPISection } from "./components/KPISection";
import { LineChartSection } from "./components/LineChartSection";
import { BarChartsSection } from "./components/BarChartsSection";
import { OtherChartsSection } from "./components/OtherChartsSection";

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <KPISection />
      <LineChartSection />
      <BarChartsSection />
      <OtherChartsSection />
    </div>
  );
};
