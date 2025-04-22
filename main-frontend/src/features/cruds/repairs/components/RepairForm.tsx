// components/ReparacionesForm.tsx
import React from "react";
import RepairACI from "./RepairACI";

const API_URL_CLIENT = "http://localhost:8000/api/clientes-autocomplete/";
const API_URL_TYPE = "http://localhost:8000/api/tipos-autocomplete/";
const API_URL_BRAND = "http://localhost:8000/api/marcas-autocomplete/";
const API_URL_MODEL = "http://localhost:8000/api/modelos-autocomplete/";

interface ReparacionesFormProps {
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function RepairForm({
    form,
    setForm,
    handleChange,
    handleSubmit,
}: ReparacionesFormProps) {
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-[#1a1f2e] p-6 text-white space-y-4"
        >
            <div className="grid grid-cols-1 gap-4">
                {/* ID, Cliente y Tipo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
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
                    <RepairACI
                        label="Cliente"
                        name="cliente_id"
                        form={form}
                        setForm={setForm}
                        endpoint={API_URL_CLIENT}
                    />
                    <RepairACI
                        label="Tipo"
                        name="tipo_id"
                        form={form}
                        setForm={setForm}
                        endpoint={API_URL_TYPE}
                    />
                </div>

                {/* Marca, Modelo y N° de Serie */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <RepairACI
                        label="Marca"
                        name="marca_id"
                        form={form}
                        setForm={setForm}
                        endpoint={API_URL_BRAND}
                    />
                    <RepairACI
                        label="Modelo"
                        name="modelo_id"
                        form={form}
                        setForm={setForm}
                        endpoint={API_URL_MODEL}
                    />
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">N° de Serie</div>
                        <input
                            type="text"
                            name="serial_num"
                            value={form.serial_num}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                </div>
                {/* Falla, Reparación */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Falla */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Falla</div>
                        <input
                            type="text"
                            name="failure"
                            value={form.failure}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] h-[60px] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Reparacion */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Reparacion</div>
                        <input
                            type="text"
                            name="repair"
                            value={form.repair}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] h-[60px] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Fecha Entrada */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Fecha Entrada</div>
                        <input
                            type="date"
                            name="entry_date"
                            value={form.entry_date}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] cursor-text text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                    {/* Fecha Presupuesto */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Fecha Presupuesto</div>
                        <input
                            type="date"
                            name="budget_date"
                            value={form.budget_date}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] cursor-text text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                    {/* Fecha de entrega */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Fecha de Entrega</div>
                        <input
                            type="date"
                            name="delivery_date"
                            value={form.delivery_date}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] cursor-text  text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Costos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Costo Repuesto */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Costo Repuestos</div>
                        <input
                            type="number"
                            name="spare_cost"
                            value={form.spare_cost}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                    {/* Costo Mano de Obra */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Mano de Obra</div>
                        <input
                            type="number"
                            name="labor_cost"
                            value={form.labor_cost}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                    {/* Pago Pendiente */}
                    <div>
                        <div className="bg-[#1e2738] text-white text-sm px-2 py-1">Pago pendiente</div>
                        <input
                            type="number"
                            name="pending_payment"
                            value={form.pending_payment}
                            onChange={handleChange}
                            className="w-full bg-[#2a3447] border border-[#3a4459] text-white px-2 py-1 focus:ring-2 focus:ring-[#4a5469] focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Confirmación y Botón */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Confirmación Check Radios*/}
                    <div className="col-start-1 col-end-3 ">
                        <div className="flex flex-row gap-25">
                            <label className="flex items-center gap-2 ">
                                <input
                                    type="radio"
                                    name="confirmation_id"
                                    value="2"
                                    checked={form.confirmation_id === 2}
                                    onChange={(e) =>
                                        setForm({ ...form, confirmation_id: Number(e.target.value) })
                                    }
                                    className="accent-green-500 cursor-pointer"
                                />
                                Aceptado
                            </label>
                            <label className="flex items-center gap-2 w-fit">
                                <input
                                    type="radio"
                                    name="confirmation_id"
                                    value="1"
                                    checked={form.confirmation_id === 1}
                                    onChange={(e) =>
                                        setForm({ ...form, confirmation_id: Number(e.target.value) })
                                    }
                                    className="accent-orange-500 cursor-pointer"
                                />
                                Pendiente
                            </label>
                            <label className="flex items-center gap-2 w-fit">
                                <input
                                    type="radio"
                                    name="confirmation_id"
                                    value="3"
                                    checked={form.confirmation_id === 3}
                                    onChange={(e) =>
                                        setForm({ ...form, confirmation_id: Number(e.target.value) })
                                    }
                                    className="accent-red-500 cursor-pointer"
                                />
                                Rechazado
                            </label>
                        </div>
                    </div>

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
    );
}
