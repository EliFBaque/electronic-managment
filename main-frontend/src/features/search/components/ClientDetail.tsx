import React, { useState, useEffect } from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft  } from "react-icons/io";
import Field from './Field';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdCheckmark } from "react-icons/io";

const API_URL = 'http://localhost:8000/api/clients/'
interface Cliente {
  id: string;
  nombre: string;
  email: string;
  tel_celular: string;
  tel_personal: string;
  tel_trabajo: string;
  direccion: string;
  contacto: string;
}

interface ClienteInfoProps {
  clienteNombre: string;
}

const ClientDetail: React.FC<ClienteInfoProps> = ({ clienteNombre }) => {
  const [clienteData, setClienteData] = useState<Cliente | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<Cliente>({
    id: "",
    nombre: "",
    email: "",
    tel_celular: "",
    tel_personal: "",
    tel_trabajo: "",
    direccion: "",
    contacto: "",
  });

  useEffect(() => {
    if (isVisible) {
      fetchCliente();
    }
  }, [isVisible]);

  const fetchCliente = async () => {
    try {
      const response = await fetch(`${API_URL}?name=${clienteNombre}`);
      const data: Cliente[] = await response.json();

      if (!response.ok) {
        throw new Error("Error al obtener el cliente");
      }

      const cliente = data.length > 0 ? data[0] : null;
      setClienteData(cliente);
      console.log(cliente, "DATOS CLIENTE")
      setFormData(cliente || formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [prevData, setPrevData] = useState(formData);

  const handleEditToggle = () => {
    setPrevData(formData);
    if (!editMode) {
      setFormData(clienteData!);
    }
    setEditMode(!editMode);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    if (prevData) {
      setFormData(prevData);
    }
    setEditMode(false);
  };

  const handleUpdateCliente = async () => {
    try {
      const response = await fetch(`${API_URL}${formData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el cliente");
      }
  
      const updatedCliente = await response.json();
      setClienteData(updatedCliente);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleSave = () => {
    setShowPopup(true);
  };

  const confirmSave = () => {
    handleUpdateCliente();
    setShowPopup(false);
    setEditMode(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={() => setIsVisible(!isVisible)}>
        <div className="flex flex-col items-center cursor-pointer font-bold">
          {isVisible ? <IoIosArrowDropleft size={20} /> : <IoIosArrowDropright size={20} />}
        </div>
      </button>

      {isVisible && (
        <div className="relative bg-[#1a1f2e] shadow-lg rounded-xl p-6 w-[600px] h-180 flex flex-col m-3">
          {clienteData ? (
            <div className='h-full mt-2'>
              <div className="flex justify-between w-full bg-gray-200 rounded-lg">
                <button className="absolute top-2 right-2 cursor-pointer text-white" onClick={() => setIsVisible(false)}>
                  <IoMdClose size={20} />
                </button>

                <button className="absolute top-2 left-2 cursor-pointer text-white" onClick={handleEditToggle}>
                  {editMode ? <IoMdCheckmark size={20} /> : <MdOutlineEdit size={20} />}
                </button>
              </div>

              {/* Campos con edición */}
              <div className="grid grid-cols-3 gap-4 cursor-default">
                <Field label="N°" value={formData.id} name="id" isEditing={false} />
                <div className="col-span-2">
                  <Field label="Cliente" name="name" value={formData.nombre} onChange={handleChange} isEditing={editMode} />
                </div>
              </div>

              <div className="mt-4 cursor-default">
                <Field label="Email" value={formData.email} name="email" onChange={handleChange} isEditing={editMode} />
              </div>

              <div className="mt-4 cursor-default">
                <Field label="Dirección" value={formData.direccion} name="address" onChange={handleChange} isEditing={editMode} />
              </div>

              <div className="flex justify-start gap-5 mt-6 cursor-default">
                <Field label="Celular" value={formData.tel_celular ?? ''} name="tel_celular" onChange={handleChange} isEditing={editMode} />
                <Field label="Tel. Personal" value={formData.tel_personal ?? ''} name="tel_personal" onChange={handleChange} isEditing={editMode} />
                <Field label="Tel. Trabajo" value={formData.tel_trabajo ?? ''} name="tel_trabajo" onChange={handleChange} isEditing={editMode} />
              </div>

              <div className="mt-4 cursor-default">
                <Field label="Contacto" value={formData.contacto} name="contact" onChange={handleChange} isEditing={editMode} />
              </div>
            </div>
          ) : (
            <p className="text-white">Cargando o sin resultados...</p>
            
          )}
          {editMode && (
            <div className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center bg-[#1a1f2e] shadow-lg">
              <div className="p-4 rounded text-center">
                <p>¿Quiere guardar los cambios en el Cliente?</p>
                <div className="mt-2 flex justify-center gap-4">
                  <button onClick={handleSave} className="bg-[#131722] text-white cursor-pointer px-4 text-sm font-semibold py-2 rounded">
                    Guardar
                  </button>
                  <button onClick={handleCancel} className="bg-[#23293a] text-white cursor-pointer px-4 text-sm font-semibold py-2 rounded">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}  
          {showPopup && (
            <div className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center bg-[#1a1f2e] shadow-lg">
              <div className="p-4 rounded text-center">
                <p>¿Seguro que quiere guardar los cambios en el Cliente?</p>
                <div className="mt-2 flex justify-center gap-4">
                  <button onClick={confirmSave} className="bg-[#131722] text-white cursor-pointer px-4 text-sm font-semibold py-2 rounded">
                    Confirmar
                  </button>
                  <button onClick={() => setShowPopup(false)} className="bg-[#23293a] text-white cursor-pointer px-4 text-sm font-semibold py-2 rounded">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}         
        </div>
        
      )}
    </div>
  );
};

export default ClientDetail;
