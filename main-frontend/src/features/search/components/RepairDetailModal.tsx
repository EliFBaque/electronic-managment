import React, {useState, useEffect } from 'react';
// React Icons imports
import {IoMdClose} from 'react-icons/io';
import {MdOutlineEdit} from 'react-icons/md';

import Field from './Field';

// Interfaces

interface DetailModalProps {
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  numReparacion: string;
  tipo: string;
  marca: string;
  fechaEntrada: string;
  modelo: string;
  fechaPresupuesto: string;
  numeroSerie: string;
  fechaSalida: string;
  falla: string;
  reparacion: string;
  costoRepuesto: string;
  manoObra: string;
  costoPendiente: string;
};

const DetailModal: React.FC<DetailModalProps> = ({selectedItem, setSelectedItem}) => {
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    numReparacion: "",
    tipo: "",
    marca: "",
    fechaEntrada: "",
    modelo: "",
    fechaPresupuesto: "",
    numeroSerie: "",
    fechaSalida: "",
    falla: "",
    reparacion: "",
    costoRepuesto: "",
    manoObra: "",
    costoPendiente: "",
  })
  
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        numReparacion: selectedItem.numReparacion || "",
        tipo: selectedItem.tipo || "",
        marca: selectedItem.marca || "",
        fechaEntrada: selectedItem.fechaEntrada || "",
        modelo: selectedItem.modelo || "",
        fechaPresupuesto: selectedItem.fechaPresupuesto || "",
        numeroSerie: selectedItem.numeroSerie || "",
        fechaSalida: selectedItem.fechaSalida || "",
        falla: selectedItem.falla || "",
        reparacion: selectedItem.reparacion || "",
        costoRepuesto: selectedItem.costoRepuesto?.toString() || "",
        manoObra: selectedItem.manoObra?.toString() || "",
        costoPendiente: selectedItem.costoPendiente?.toString() || "",
      });
    }
  }, [selectedItem]);

  
  const [prevData, setPrevData] = useState(formData);

  const handleEdit = () => {
    setPrevData(formData);
    setEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleCancel = () => {
    if (prevData){
      setFormData(prevData);
    }
    setEditMode(false);
  };

  const handleSave = () => {
    setShowPopup(true);
  };

  const confirmSave = () => {
    setShowPopup(false);
    setEditMode(false);
  };

  return(
        <div className="fixed inset-0 flex items-center justify-center h-screen bg-black/70">
            {/* Table container */}
            <div className="relative bg-[#1a1f2e] shadow-lg rounded-xl p-6 w-[600px] h-auto flex flex-col m-3 justify-between">
                {/* Edit and Close buttons */}
                <div className="flex justify-between w-full bg-gray-200 rounded-lg">
                    <button className="absolute top-2 right-2 text-white" onClick={() => setSelectedItem(null)}>
                        <IoMdClose size={20} />
                    </button>
                    <button className="absolute top-2 left-2 text-white" onClick={handleEdit}>
                        <MdOutlineEdit size={20} />
                    </button>
                </div>

                {/* First Row */}
                <div className="grid grid-cols-3 gap-4">
                    <Field label="N°" value={formData.numReparacion} name="numReparacion" onChange={handleChange} isEditing={editMode} />
                    <div className="col-span-2">
                        <Field label="Tipo" name='tipo' onChange={handleChange} value={formData.tipo} isEditing={editMode} />
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Field label="Marca" name='marca' onChange={handleChange} value={formData.marca} isEditing={editMode} />
                    <Field label="Fecha de Entrada" name='fechaEntrada' onChange={handleChange} value={formData.fechaEntrada} center isEditing={editMode} />
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Field label="Modelo" name='modelo' onChange={handleChange} value={formData.modelo} isEditing={editMode} />
                    <Field label="Fecha de Presupuesto" name='fechaPresupuesto' onChange={handleChange} value={formData.fechaPresupuesto} center isEditing={editMode} />
                </div>

                {/* Fourth Row */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Field label="N° Serie" name='numeroSerie' onChange={handleChange} value={formData.numeroSerie} isEditing={editMode} />
                    <Field label="Fecha de Salida" name='fechaSalida' onChange={handleChange} value={formData.fechaSalida} center isEditing={editMode} />
                </div>

                {/* Fifth Row */}
                <div className="mt-4">
                    <Field label="Falla" value={formData.falla} height="h-20" itemcenter scrollable isEditing={editMode} name="falla" onChange={handleChange}/>
                </div>
                
                {/* Sixth Row */}
                <div className="mt-4">
                    <Field label="Reparacion" value={formData.reparacion} height="h-20" itemcenter scrollable isEditing={editMode} name="reparacion" onChange={handleChange}/>
                </div>

                {/* Seventh Row */}
                <div className="flex justify-start gap-5 mt-6">
                    <Field label="Costo de repuesto" name="costoRepuesto" onChange={handleChange} value={formData.costoRepuesto.toString()} isEditing={editMode} />
                    <Field label="Mano de obra" name="manoObra" onChange={handleChange} value={formData.manoObra.toString()} isEditing={editMode} />
                    <Field label="Debe" name="debe" onChange={handleChange} value={formData.costoPendiente.toString()} isEditing={editMode} />
                </div>
                {/* Edit Mode buttons */}
                {editMode && (
                    <div className="flex justify-between mt-6">
                        <button onClick={handleSave} className="bg-[#131722] text-white px-4 text-sm font-semibold py-2 rounded">Guardar</button>
                        <button onClick={handleCancel} className="bg-[#23293a] text-white px-4 text-sm font-semibold py-2 rounded">Cancelar</button>
                    </div>
                )}
                {/* Save Changes Buttons */}
                {showPopup && (
                    <div className="fixed inset-0 items-center justify-center bg-black/70">
                        <div className="bg-[#1a1f2e] p-6 rounded shadow-lg text-center">
                            <p>¿Seguro que quiere guardar los cambios?</p>
                            <div className="mt-4 flex justify-center gap-4">
                                <button onClick={confirmSave} className="bg-[#131722] text-white px-4 text-sm font-semibold py-2 rounded">Confirmar</button>
                                <button onClick={() => setShowPopup(false)} className="bg-[#23293a] text-white px-4 text-sm font-semibold py-2 rounded">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
  )

};

export default DetailModal;