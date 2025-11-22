import axios from "axios";
import { PieChartData, LineChartData } from "../types/dashboardTypes";

export const fetchOtherChartsData = async (): Promise<{
  pie: PieChartData[];
  miniLine: LineChartData[];
  map: { region: string; lat: number; lon: number }[];
}> => {
  const { data } = await axios.get("/api/other-charts");
  return data;
};