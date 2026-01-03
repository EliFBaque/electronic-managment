import React, { useState, useEffect } from 'react';
// React Icons imports
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import ClientDetail from './ClientDetail';
import Field from './Field';

const API_URL = "http://localhost:8000/api/reparaciones/";
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
  fch_entrada: string;
  modelo: string;
  fch_presu: string;
  num_serie: string;
  fch_salida: string;
  falla: string;
  reparacion: string;
  costo_repuesto: string;
  costo_mano_obra: string;
  pendiente_pago: string;
};

const DetailModal: React.FC<DetailModalProps> = ({ selectedItem, setSelectedItem }) => {
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    cliente: "",
    tipo: "",
    marca: "",
    fch_entrada: "",
    modelo: "",
    fch_presu: "",
    num_serie: "",
    fch_salida: "",
    falla: "",
    reparacion: "",
    costo_repuesto: "",
    costo_mano_obra: "",
    pendiente_pago: "",
  })

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        id: selectedItem.id || "-",
        cliente: selectedItem.cliente || "-",
        tipo: selectedItem.tipo || "-",
        marca: selectedItem.marca || "-",
        fch_entrada: selectedItem.fch_entrada || "-",
        modelo: selectedItem.modelo || "-",
        fch_presu: selectedItem.fch_presu || "-",
        num_serie: selectedItem.num_serie || "-",
        fch_salida: selectedItem.fch_salida || "-",
        falla: selectedItem.falla || "-",
        reparacion: selectedItem.reparacion || "-",
        costo_repuesto: selectedItem.costo_repuesto?.toString() || "-",
        costo_mano_obra: selectedItem.costo_mano_obra?.toString() || "-",
        pendiente_pago: selectedItem.pendiente_pago?.toString() || "-",
      });
    }
  }, [selectedItem]);


  const [prevData, setPrevData] = useState(formData);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = () => {
    setPrevData(formData);
    setEditMode(!editMode);
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
    const formattedFormData = {
      ...formData,
      fch_entrada: formatDate(formData.fch_entrada), 
      fch_salida: formatDate(formData.fch_salida),
      fch_presu: formatDate(formData.fch_presu),
    };
    setFormData(formattedFormData);
    setShowPopup(true);
  };

  const handleUpdateReparaciones = async () => {
    try {
      const response = await fetch(`${API_URL}${formData.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la reparacion');
      }
      const updatedReparacion = await response.json();
      setFormData(updatedReparacion);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirmSave = () => {
    handleUpdateReparaciones()
    setShowPopup(false);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen bg-black/70">
      {/* Table container */}
      <div className="relative bg-[#1a1f2e] shadow-lg rounded-xl p-6 w-[600px] h-180 flex flex-col m-3 justify-between">
        {/* Edit and Close buttons */}
        <div className="flex justify-between w-full bg-gray-200 rounded-lg">
          <button className="absolute top-2 right-2 text-white cursor-pointer" onClick={() => setSelectedItem(null)}>
            <IoMdClose size={20} />
          </button>
          <button className="absolute top-2 left-2 text-white cursor-pointer" onClick={handleEdit}>
            {editMode ? <IoMdCheckmark size={20} /> : <MdOutlineEdit size={20} />}
          </button>
        </div>
        {/* First Row */}
        <div className="grid grid-cols-3 gap-4 cursor-default">
          <Field label="N°" value={formData.id} name="id" onChange={handleChange} isEditing={false} />
          <div className="col-span-2">
            <Field label="Tipo" name='tipo' onChange={handleChange} value={formData.tipo} isEditing={editMode} />
          </div>
        </div>
        {/* Second Row */}
        <div className="grid grid-cols-2 gap-4 mt-4 cursor-default">
          <Field label="Marca" name='marca' onChange={handleChange} value={formData.marca} isEditing={editMode} />
          <Field label="Fecha de Entrada" name='fch_entrada' onChange={handleChange} value={formData.fch_entrada} isEditing={editMode} />
        </div>
        {/* Third Row */}
        <div className="grid grid-cols-2 gap-4 mt-4 cursor-default">
          <Field label="Modelo" name='modelo' onChange={handleChange} value={formData.modelo} isEditing={editMode} />
          <Field label="Fecha de Presupuesto" name='fch_presu' onChange={handleChange} value={formData.fch_presu} isEditing={editMode} />
        </div>
        {/* Fourth Row */}
        <div className="grid grid-cols-2 gap-4 mt-4 cursor-default">
          <Field label="N° Serie" name='serial_num' onChange={handleChange} value={formData.num_serie} isEditing={editMode} />
          <Field label="Fecha de Salida" name='fch_salida' onChange={handleChange} value={formData.fch_salida} isEditing={editMode} />
        </div>
        {/* Fifth Row */}
        <div className="mt-4 cursor-default">
          <Field label="Falla" value={formData.falla} height="h-20" itemcenter scrollable isEditing={editMode} name="falla" onChange={handleChange} />
        </div>
        {/* Sixth Row */}
        <div className="mt-4 cursor-default">
          <Field label="Reparacion" value={formData.reparacion} height="h-20" itemcenter scrollable isEditing={editMode} name="reparacion" onChange={handleChange} />
        </div>
        {/* Seventh Row */}
        <div className="flex justify-start gap-5 mt-6 cursor-default">
          <Field label="Costo de repuesto" name="costo_repuesto" onChange={handleChange} value={formData.costo_repuesto.toString()} isEditing={editMode} />
          <Field label="Mano de obra" name="costo_mano_obra" onChange={handleChange} value={formData.costo_mano_obra.toString()} isEditing={editMode} />
          <Field label="Debe" name="pendiente_pago" onChange={handleChange} value={formData.pendiente_pago.toString()} isEditing={editMode} />
        </div>
        {/* Edit Mode buttons */}
        {editMode && (
          <div className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center bg-[#1a1f2e] shadow-lg">
            <div className="p-4 rounded text-center">
              <p>¿Quiere guardar los cambios en Reparacion?</p>
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
        {/* Save Changes Buttons */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center bg-[#1a1f2e] shadow-lg">
            <div className="p-4 rounded text-center">
              <p>¿Seguro que quiere guardar los cambios en Reparacion?</p>
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

      {/* Cliente 
          Agregar un transition para que se vea mas bonito
      */}
      <ClientDetail clienteNombre={formData.cliente} />

    </div>
  )

};

export default DetailModal;