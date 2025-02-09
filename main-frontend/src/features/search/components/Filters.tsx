import React from 'react';


interface FiltersProps {
  filters: Record<string, string>;
  onFilterChange: React.ChangeEventHandler<HTMLInputElement>;
}

const filterFields = [
  { name: 'id', label: 'N°' },
  { name: 'cliente', label: 'Cliente' },
  { name: 'telefono', label: 'Telefono' },
  { name: 'tipo', label: 'Tipo' },
  { name: 'marca', label: 'Marca' },
  { name: 'modelo', label: 'Modelo' },
  { name: 'nroSerie', label: 'N° de Serie' },
  { name: 'fechaEntrada', label: 'Fecha Entrada' },
  { name: 'fechaSalida', label: 'Fecha Salida' }
];

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => (
  <form className="mb-8">
    <div className="grid grid-cols-3 gap-4 mb-4">
      {filterFields.map(({ name, label }) => (
        <div key={name} className="space-y-1">
          <div className="bg-[#1e2738] text-white text-sm px-2 py-1">{label}</div>
          <input
            type="text"
            name={name}
            value={filters[name]}
            onChange={onFilterChange}
            className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
          />
        </div>
      ))}
    </div>
  </form>
);

export default Filters;