import React from 'react';
import { FaArrowRotateLeft } from "react-icons/fa6";


interface FiltersProps {
  filters: Record<string, string>;
  onFilterChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetDate: (field: string) => void;
}

const filterFields = [
  { name: 'id', label: 'N°' },
  { name: 'cliente', label: 'Cliente' },
  { name: 'tipo', label: 'Tipo' },
  { name: 'marca', label: 'Marca' },
  { name: 'modelo', label: 'Modelo' },
  { name: 'serial_num', label: 'N° de Serie' },
  { name: 'entry_date_min', label: 'Fecha Entrada' },
  { name: '', label: '' }, // Espacio vacío sin estilos
  { name: 'delivery_date_max', label: 'Fecha Salida' }
];

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onResetDate }) => (
  <form className="mb-8">
    <div className="grid grid-cols-3 gap-4 mb-4">
      {filterFields.map(({ name, label }) => (
        <div key={name || label} className={label ? "relative space-y-1" : ""}>
          {label ? (
            <>
              <div className="bg-[#1e2738] text-white text-sm px-2 py-1">{label}</div>
              <div className="relative">
                <input
                  type={name.includes("date") ? "date" : "text"}
                  name={name}
                  value={filters[name] || ""}
                  onChange={onFilterChange}
                  className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                  
                />
                {name.includes("date") && filters[name] && (
                  <button
                    type="button"
                    onClick={() => onResetDate(name)}
                    className="absolute right-9 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-400"
                  >
                    <FaArrowRotateLeft size={18} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-[58px] bg-transparent"></div> // Espacio vacío sin estilos
          )}
        </div>
      ))}
    </div>
  </form>
);

export default Filters;
