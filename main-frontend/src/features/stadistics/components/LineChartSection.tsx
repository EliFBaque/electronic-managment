import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// import { fetchLineChartData } from "../api/linechartApi";
import { LineChartData } from "../types/dashboardTypes";

const mockLineDataNoInflacion: LineChartData[] = [
  { date: "1997-01", value: 1040 },
  { date: "1998-02", value: 890 },
  { date: "1999-03", value: 1360 },
  { date: "2000-04", value: 970 },
  { date: "2001-05", value: 1430 },
  { date: "2002-06", value: 1120 },
  { date: "2003-07", value: 1250 },
  { date: "2004-08", value: 860 },
  { date: "2005-09", value: 1490 },
  { date: "2006-10", value: 1320 },
  { date: "2007-11", value: 910 },
  { date: "2008-12", value: 1400 },
  { date: "2009-01", value: 1190 },
  { date: "2010-02", value: 1010 },
  { date: "2011-03", value: 1440 },
  { date: "2012-04", value: 940 },
  { date: "2013-05", value: 1280 },
  { date: "2014-06", value: 880 },
  { date: "2015-07", value: 1340 },
  { date: "2016-08", value: 1210 },
  { date: "2017-09", value: 1470 },
  { date: "2018-10", value: 970 },
  { date: "2019-11", value: 1380 },
  { date: "2020-12", value: 1060 }
];

const mockLineDataConInflacion: LineChartData[] = [
  { date: "2025-01", value: 950 },
  { date: "2025-02", value: 1150 },
  { date: "2025-03", value: 870 },
  { date: "2025-04", value: 1250 },
  { date: "2025-05", value: 1320 },
  { date: "2025-06", value: 1180 },
  { date: "2025-07", value: 1420 },
  { date: "2025-08", value: 1360 },
  { date: "2025-09", value: 1275 },
  { date: "2025-10", value: 1210 },
  { date: "2025-11", value: 9520 },
  { date: "2025-12", value: 1380 },
  { date: "2026-01", value: 1020 },
  { date: "2026-02", value: 9220 },
  { date: "2026-03", value: 1100 },
  { date: "2026-04", value: 1240 },
  { date: "2026-05", value: 1390 },
  { date: "2026-06", value: 1500 },
  { date: "2026-07", value: 1430 },
  { date: "2026-08", value: 1320 },
  { date: "2026-09", value: 1280 },
  { date: "2026-10", value: 1170 },
  { date: "2026-11", value: 1250 },
  { date: "2026-12", value: 1470 }
];


export const LineChartSection: React.FC = () => {
  const [data, setData] = useState<LineChartData[]>([]);
  const [inflacion, setInflacion] = useState(false);

  useEffect(() => {
    setData(inflacion ? mockLineDataConInflacion : mockLineDataNoInflacion);
    //fetchLineChartData(inflacion).then(setData).catch(console.error);
  }, [inflacion]);

  return (
    <div className="chart-box chart-section large">
      <div className="chart-header">
        <h3 className="chart-title">{inflacion ? "Ganancia ajustada (con inflación)" : "Ganancia total (sin inflación)"}</h3>

        <label className="switch">
          <input type="checkbox" checked={inflacion} onChange={() => setInflacion(!inflacion)} />
          <span className="slider" />
        </label>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ backgroundColor: "#2a3447", borderRadius: "12px", padding: "8px" }}
      >
        <LineChart data={data}>
          <CartesianGrid stroke="#3c475f" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            stroke="#ffffff"
            tick={{ fill: "#ffffff" }}
          />
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
          <Line
            type="monotone"
            dataKey="value"
            stroke={inflacion ? "#ff9800" : "#4caf50"}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
