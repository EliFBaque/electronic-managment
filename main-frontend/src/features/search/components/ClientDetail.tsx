import React, { useState, useEffect } from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft  } from "react-icons/io";
import Field from './Field';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdCheckmark } from "react-icons/io"; // Icono para guardar

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
  const [editMode, setEditMode] = useState(false); // Estado para edición
  const [formData, setFormData] = useState<Cliente>({
    id: "",
    name: "",
    email: "",
    cellphone: "",
    personal_phone: "",
    work_phone: "",
    address: "",
    contact: "",
  });

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

      const cliente = data.length > 0 ? data[0] : null;
      setClienteData(cliente);
      setFormData(cliente || formData); // Copia los datos al formulario si hay cliente
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditToggle = () => {
    if (!editMode) {
      setFormData(clienteData!); // Cargar datos actuales al formulario al activar edición
    }
    setEditMode(!editMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setClienteData(formData); // Guardar cambios en la vista
    setEditMode(false); // Desactivar edición
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={() => setIsVisible(!isVisible)}>
        <div className="flex flex-col items-center font-bold">
          {isVisible ? <IoIosArrowDropleft size={20} /> : <IoIosArrowDropright size={20} />}
        </div>
      </button>

      {isVisible && (
        <div className="relative bg-[#1a1f2e] shadow-lg rounded-xl p-6 w-[600px] h-180 flex flex-col m-3">
          {clienteData ? (
            <div className='h-full mt-2'>
              <div className="flex justify-between w-full bg-gray-200 rounded-lg">
                <button className="absolute top-2 right-2 text-white" onClick={() => setIsVisible(false)}>
                  <IoMdClose size={20} />
                </button>

                <button className="absolute top-2 left-2 text-white" onClick={handleEditToggle}>
                  {editMode ? <IoMdCheckmark size={20} /> : <MdOutlineEdit size={20} />}
                </button>
              </div>

              {/* Campos con edición */}
              <div className="grid grid-cols-3 gap-4">
                <Field label="N°" value={formData.id} name="id" isEditing={false} />
                <div className="col-span-2">
                  <Field label="Cliente" name="name" value={formData.name} onChange={handleChange} isEditing={editMode} />
                </div>
              </div>

              <div className="mt-4">
                <Field label="Email" value={formData.email} name="email" onChange={handleChange} isEditing={editMode} />
              </div>

              <div className="mt-4">
                <Field label="Dirección" value={formData.address} name="address" onChange={handleChange} isEditing={editMode} />
              </div>

              <div className="flex justify-start gap-5 mt-6">
                <Field label="Celular" value={formData.cellphone.toString()} name="cellphone" onChange={handleChange} isEditing={editMode} />
                <Field label="Tel. Personal" value={formData.personal_phone.toString()} name="personal_phone" onChange={handleChange} isEditing={editMode} />
                <Field label="Tel. Trabajo" value={formData.work_phone.toString()} name="work_phone" onChange={handleChange} isEditing={editMode} />
              </div>

              <div className="mt-4">
                <Field label="Contacto" value={formData.contact} name="contact" onChange={handleChange} isEditing={editMode} />
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
