export interface KPI {
  title: string;
  value: number | string;
}

export interface LineChartDataBarChart {
  date: string;
  value: number;
  otherValue: number;
}

export interface LineChartData {
  date: string;
  value: number;
}

export interface BarChartData {
  category: string;
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
  [key: string]: string | number; // 👈 index signature agregada
}