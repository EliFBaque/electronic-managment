import axios from "axios";
import { LineChartData } from "../types/dashboardTypes";

export const fetchLineChartData = async (inflacion: boolean): Promise<LineChartData[]> => {
  const { data } = await axios.get(`/api/line-chart?inflacion=${inflacion}`);
  return data;
};