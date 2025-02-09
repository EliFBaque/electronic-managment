import React from 'react';
import { IoMdClose } from "react-icons/io";

interface DetailModalProps {
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}
/* Need to restyle this i really dont like it */
const DetailModal: React.FC<DetailModalProps> = ({ selectedItem, setSelectedItem }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
    <div className="bg-[#1e2738] rounded-lg p-6 max-w-2xl w-full relative text-white">
      <button
        onClick={() => setSelectedItem(null)}
        className="absolute top-4 right-4 p-2 hover:bg-[#2a3447] rounded-full transition-colors"
      >
        <IoMdClose size={20} />
      </button>
      <h2 className="text-2xl font-bold mb-6">Detalles de la Reparación</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries({
          "N°": selectedItem.id,
          "Cliente": selectedItem.cliente,
          "Marca": selectedItem.marca,
          "Modelo": selectedItem.modelo,
          "N° de Serie": selectedItem.nroSerie,
          "Aceptado": selectedItem.aceptado,
          "Tipo": selectedItem.tipo,
          "Email": selectedItem.email,
          "Teléfono": selectedItem.telefono,
          "Fecha de Entrada": selectedItem.fechaEntrada,
          "Fecha de Salida": selectedItem.fechaSalida,
        }).map(([label, value]) => (
          <div key={label}>
            <p className="font-semibold text-gray-300">{label}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setSelectedItem(null)}
        className="mt-6 w-full bg-[#2a3447] text-white py-2 rounded-md hover:bg-[#3a4459] transition-colors"
      >
        Cerrar
      </button>
    </div>
  </div>
);

export default DetailModal;