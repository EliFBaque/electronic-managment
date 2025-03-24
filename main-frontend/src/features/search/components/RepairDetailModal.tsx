import React, { useState, useEffect } from 'react';
// React Icons imports
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import ClientDetail from './ClientDetail';
import Field from './Field';

// Interfaces

interface DetailModalProps {
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  id: string;
  cliente: string;
  tipo: string;
  marca: string;
  entry_date: string;
  modelo: string;
  budget_date: string;
  serial_num: string;
  delivery_date: string;
  failure: string;
  repair: string;
  spare_cost: string;
  labor_cost: string;
  pending_payment: string;
};

const DetailModal: React.FC<DetailModalProps> = ({ selectedItem, setSelectedItem }) => {
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    cliente: "",
    tipo: "",
    marca: "",
    entry_date: "",
    modelo: "",
    budget_date: "",
    serial_num: "",
    delivery_date: "",
    failure: "",
    repair: "",
    spare_cost: "",
    labor_cost: "",
    pending_payment: "",
  })

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        id: selectedItem.id || "-",
        cliente: selectedItem.cliente || "-",
        tipo: selectedItem.tipo || "-",
        marca: selectedItem.marca || "-",
        entry_date: selectedItem.entry_date || "-",
        modelo: selectedItem.modelo || "-",
        budget_date: selectedItem.budget_date || "-",
        serial_num: selectedItem.serial_num || "-",
        delivery_date: selectedItem.delivery_date || "-",
        failure: selectedItem.failure || "-",
        repair: selectedItem.repair || "-",
        spare_cost: selectedItem.spare_cost?.toString() || "-",
        labor_cost: selectedItem.labor_cost?.toString() || "-",
        pending_payment: selectedItem.pending_payment?.toString() || "-",
      });
    }
  }, [selectedItem]);


  const [prevData, setPrevData] = useState(formData);

  const handleEdit = () => {
    setPrevData(formData);
    setEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (prevData) {
      setFormData(prevData);
    }
    setEditMode(false);
  };

  const handleSave = () => {
    setShowPopup(true);
    console.log(formData);
  };

  const confirmSave = () => {
    // Aca tiene que estar la request al back de edit
    setShowPopup(false);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen bg-black/70">
      {/* Table container */}
      <div className="relative bg-[#1a1f2e] shadow-lg rounded-xl p-6 w-[600px] h-180 flex flex-col m-3 justify-between">
        {/* Edit and Close buttons */}
        <div className="flex justify-between w-full bg-gray-200 rounded-lg">
          <button className="absolute top-2 right-2 text-white" onClick={() => setSelectedItem(null)}>
            <IoMdClose size={20} />
          </button>
          <button className="absolute top-2 left-2 text-white" onClick={handleEdit}>
            {editMode ? <IoMdCheckmark size={20} /> : <MdOutlineEdit size={20} />}
          </button>
        </div>
        {/* First Row */}
        <div className="grid grid-cols-3 gap-4">
          <Field label="N°" value={formData.id} name="id" onChange={handleChange} isEditing={false}/>
          <div className="col-span-2">
            <Field label="Tipo" name='tipo' onChange={handleChange} value={formData.tipo} isEditing={editMode} />
          </div>
        </div>
        {/* Second Row */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field label="Marca" name='marca' onChange={handleChange} value={formData.marca} isEditing={editMode} />
          <Field label="Fecha de Entrada" name='entry_date' onChange={handleChange} value={formData.entry_date} isEditing={editMode} />
        </div>
        {/* Third Row */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field label="Modelo" name='modelo' onChange={handleChange} value={formData.modelo} isEditing={editMode} />
          <Field label="Fecha de Presupuesto" name='budget_date' onChange={handleChange} value={formData.budget_date} isEditing={editMode} />
        </div>
        {/* Fourth Row */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field label="N° Serie" name='serial_num' onChange={handleChange} value={formData.serial_num} isEditing={editMode} />
          <Field label="Fecha de Salida" name='delivery_date' onChange={handleChange} value={formData.delivery_date} isEditing={editMode} />
        </div>
        {/* Fifth Row */}
        <div className="mt-4">
          <Field label="Falla" value={formData.failure} height="h-20" itemcenter scrollable isEditing={editMode} name="falla" onChange={handleChange} />
        </div>
        {/* Sixth Row */}
        <div className="mt-4">
          <Field label="Reparacion" value={formData.repair} height="h-20" itemcenter scrollable isEditing={editMode} name="reparacion" onChange={handleChange} />
        </div>
        {/* Seventh Row */}
        <div className="flex justify-start gap-5 mt-6">
          <Field label="Costo de repuesto" name="costoRepuesto" onChange={handleChange} value={`$ ${formData.spare_cost.toString()}`} isEditing={editMode} />
          <Field label="Mano de obra" name="manoObra" onChange={handleChange} value={`$ ${formData.labor_cost.toString()}`} isEditing={editMode} />
          <Field label="Debe" name="debe" onChange={handleChange} value={`$ ${formData.pending_payment.toString()}`} isEditing={editMode} />
        </div>
        {/* Edit Mode buttons */}
        {editMode && (
          <div className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center bg-[#1a1f2e] shadow-lg">
            <div className="p-4 rounded text-center">
              <p>¿Quiere guardar los cambios en reparacion?</p>
              <div className="mt-2 flex justify-center gap-4">
                <button onClick={handleSave} className="bg-[#131722] text-white px-4 text-sm font-semibold py-2 rounded">
                  Guardar
                </button>
                <button onClick={handleCancel} className="bg-[#23293a] text-white px-4 text-sm font-semibold py-2 rounded">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Save Changes Buttons */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center bg-[#1a1f2e] shadow-lg">
            <div className="p-4 rounded text-center">
              <p>¿Seguro que quiere guardar los cambios en reparacion?</p>
              <div className="mt-2 flex justify-center gap-4">
                <button onClick={confirmSave} className="bg-[#131722] text-white px-4 text-sm font-semibold py-2 rounded">
                  Confirmar
                </button>
                <button onClick={() => setShowPopup(false)} className="bg-[#23293a] text-white px-4 text-sm font-semibold py-2 rounded">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Cliente 
          Agregar un transition para que se vea mas bonito
      */}
      <ClientDetail clienteNombre={formData.cliente} />

    </div>
  )

};

export default DetailModal;