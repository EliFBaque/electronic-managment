import React, { useEffect, useState } from 'react';

type Opcion = {
  id: number;
  name: string;
};

interface AutocompleteInputProps {
  label: string;
  name: string;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  endpoint: string;
}

const RepairACI: React.FC<AutocompleteInputProps> = ({
  label,
  name,
  //@ts-ignore
  form,
  setForm,
  endpoint,
}) => {
  const [query, setQuery] = useState('');
  const [sugerencias, setSugerencias] = useState<Opcion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 2) {
        fetch(`${endpoint}?search=${query}`)
          .then(res => res.json())
          .then((data: Opcion[]) => setSugerencias(data));
      } else {
        setSugerencias([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (opcion: Opcion) => {
    setSelectedName(opcion.name);
    setForm((prev: Record<string, any>) => ({
      ...prev,
      [name]: opcion.id,
    }));
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="bg-[#1e2738] text-white text-sm px-2 py-1">{label}</div>
      <input
        type="text"
        name={name}
        value={selectedName || query}
        onChange={e => {
          setQuery(e.target.value);
          setSelectedName('');
          setForm((prev: Record<string, any>) => ({
            ...prev,
            [name]: '',
          }));
          setShowDropdown(true);
        }}
        className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
        autoComplete="off"
      />
      {showDropdown && sugerencias.length > 0 && (
        <ul className="absolute z-10 w-full bg-[#2a3447] border border-[#3a4459] text-white max-h-48 overflow-auto">
          {sugerencias.map((opcion: Opcion) => (
            <li
              key={opcion.id}
              onClick={() => handleSelect(opcion)}
              className="px-2 py-1 hover:bg-[#3a4459] cursor-pointer"
            >
              {opcion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepairACI;