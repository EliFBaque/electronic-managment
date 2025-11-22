import axios from "axios";
import { BarChartData } from "../types/dashboardTypes";

export const fetchBarChartsData = async (): Promise<{ ventas: BarChartData[]; gastos: BarChartData[] }> => {
  const { data } = await axios.get("/api/bar-charts");
  return data;
};