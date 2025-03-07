import React, { useState, useEffect } from 'react';
import { IoIosArrowDropright } from "react-icons/io";
import Field from './Field';
// Add more styles to the component
interface Cliente {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  personal_phone: string;
  work_phone: string;
  address: string;
  contact: string;
}

interface ClienteInfoProps {
  clienteNombre: string;
}

const ClientDetail: React.FC<ClienteInfoProps> = ({ clienteNombre }) => {
  const [clienteData, setClienteData] = useState<Cliente | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      fetchCliente();
    }
  }, [isVisible]);

  const fetchCliente = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cliente/?name=${clienteNombre}`);
      const data: Cliente[] = await response.json();

      if (!response.ok) {
        throw new Error("Error al obtener el cliente");
      }

      setClienteData(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={() => setIsVisible(!isVisible)}>
        <div className="flex flex-col items-center font-bold">
          <IoIosArrowDropright size={20} />
        </div>
      </button>
      {/* Cliente Table */}
      {isVisible && (
        <div className="relative bg-[#1a1f2e] shadow-lg rounded-xl p-6 w-[600px] h-180 flex flex-col m-3">
          {clienteData ? (
            <div>
              {/* First Row */}
              <div className="grid grid-cols-3 gap-4">
                <Field label="N°" value={clienteData.id} name="n°" isEditing={false} />
                <div className="col-span-2">
                  <Field label="Cliente" name='cliente' value={clienteData.name} isEditing={false} />
                </div>
              </div>
              {/* Second Row */}
              <div className="mt-4">
                <Field label="Email" value={clienteData.email} isEditing={false} />
              </div>
              {/* Third Row */}
              <div className="mt-4">
                <Field label="Dirección" value={clienteData.address} isEditing={false} />
              </div>
              {/* Fourth Row */}
              <div className="flex justify-start gap-5 mt-6">
                <Field label="Celular" value={clienteData.cellphone.toString()} isEditing={false} />
                <Field label="Tel. Personal" value={clienteData.personal_phone.toString()} isEditing={false} />
                <Field label="Tel. Trabajo" value={clienteData.work_phone.toString()} isEditing={false} />
              </div>
              {/* Fifth Row */}
              <div className="mt-4">
                <Field label="Contacto" value={clienteData.contact} isEditing={false} />
              </div>
            </div>
          ) : (
            <p className="text-white">Cargando o sin resultados...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientDetail;