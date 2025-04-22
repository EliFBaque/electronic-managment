import { useState } from "react";

import RepairsCD from "../cruds/repairs/RepairCD";
import ClienteCD from "../cruds/cliente/ClienteCD";
import MarcaCD from "../cruds/marca/MarcaCD";
import ModeloCD from "../cruds/modelo/ModeloCD";
import TipoCD from "../cruds/tipo/TipoCD";

const SectionsCD = [
  { id: 1, title: "Reparaciones", content: <RepairsCD /> },
  { id: 2, title: "Cliente", content: <ClienteCD /> },
  { id: 3, title: "Marca", content: <MarcaCD /> },
  { id: 4, title: "Modelo", content: <ModeloCD /> },
  { id: 5, title: "Tipo", content: <TipoCD /> },
];

export default function ModelsCD() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full grid grid-cols-1">
        {SectionsCD.map((rect) => (
          <div
            key={rect.id}
            className="bg-gray-800 border border-[#3a4459] text-white shadow overflow-hidden transition-all"
          >
            {/* Solo este div tiene el onClick */}
            <div
              className="px-6 py-4 text-lg font-semibold cursor-pointer"
              onClick={() => toggle(rect.id)}
            >
              {rect.title}
            </div>

            {/* Contenido oculto/expandible */}
            <div
              className={`transition-all duration-300 overflow-hidden ${openId === rect.id ? "max-h-[885px] " : "max-h-0 py-0"
                } bg-gray-700 text-sm`}
            >
              {rect.content}
            </div>
          </div>
        ))}
      </div>
          
          {openId === null && (
            <div className="flex items-center justify-center h-1/2">
              <p className="text-white text-xl text-center px-4">
                Selecciona una sección para comenzar. Aquí podrás administrar Reparaciones, Clientes, Marcas, Modelos y Tipos.
              </p>
            </div>
          )}
    </div>      
  );
};