import axios from "axios";
import { KPI } from "../types/dashboardTypes";

export const fetchKPIs = async (): Promise<KPI[]> => {
  // Simulación de API
  const { data } = await axios.get("/api/kpis");
  return data;
};