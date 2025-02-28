import React from 'react';
import '../styles/search.css';
// @ts-ignore
import { RepairItem } from '../SearchFeature';

interface RepairTableProps {
  repairs: RepairItem[];
  setSelectedItem: React.Dispatch<React.SetStateAction<RepairItem | null>>;
}

const columns = [
  { key: 'id', label: 'N°' },
  { key: "cliente", label: "Cliente" },
  { key: "telefono", label: "Teléfono" },
  { key: "tipo", label: "Tipo" },
  { key: "marca", label: "Marca" },
  { key: "modelo", label: "Modelo" },
  { key: "serial_num", label: "N° de Serie" },
  { key: "entry_date", label: "Entrada" },
  { key: "delivery_date", label: "Salida" },
];

const RepairTable: React.FC<RepairTableProps> = ({ repairs, setSelectedItem }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-[#3a4459]">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className='th-repairTable'>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        
        {/* Fill table with data */}
        {repairs.map((repair) => (
          <tr
            key={repair.id}
            onClick={() => setSelectedItem(repair)}
            className="
            hover:bg-[#2a3447] 
            cursor-pointer 
            transition-colors 
            text-white 
            w-full"
          >
            {columns.map((col) => (
              <td key={col.key} className="td-repairTable">{repair[col.key as keyof RepairItem]}</td>
            ))}
          </tr>
        ))}

        {/* Fill empty rows */}
        {Array.from({ length: Math.max(0, 15 - repairs.length) }).map((_, index) => (
          <tr key={`empty-${index}`} className="border border-[#3a4459] px-4 py-2 text-sm text-white">
            {columns.map((col) => (
              <td key={col.key} className="td-repairTable">-</td>
            ))}
          </tr>
        ))}

      </tbody>
    </table>
  </div>
);

export default RepairTable;
