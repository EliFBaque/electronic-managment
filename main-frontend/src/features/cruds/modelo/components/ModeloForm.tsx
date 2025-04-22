import React from "react";

interface ModeloFormProps {
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
};

export default function ModeloForm({
    form,
    setForm,
    handleChange,
    handleSubmit,
}: ModeloFormProps) {
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-[#1a1f2e] p-6 text-white space-y-4"
        >
            <div className="grid grid-cols-1 gap-4">
                {/* ID, Nombre y Direccion */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="col-start-1 col-end-3">
                        <div className="bg-[#1e2738] text-white text-sm   px-2 py-1">ID</div>
                        <input
                            type="number"
                            name="ID"
                            placeholder="Auto ID"
                            disabled
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] cursor-not-allowed text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="col-span-2 col-end-7">
                        <div className="bg-[#1e2738] text-white text-sm   px-2 py-1">Modelo</div>
                        <input
                            type="text"
                            name="name"
                            value={form.name}                         
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                </div>
                {/* Confirmación y Botón */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Botón Agregar */}
                    <div className="col-span-2 col-end-7">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 w-60 px-6 py-2 rounded mt-4 cursor-pointer"
                            onClick={() => { }}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
};