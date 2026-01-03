import { useState, useEffect } from 'react';
import RepairForm from './components/RepairForm';
import RepairTable from './components/RepairTable';
import RepairPag from './components/RepairPag';

const API_URL = 'http://localhost:8000/api/repairs/';

export default function RepairsCD(){

    {/* Form Variables */}
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        cliente: 0,
        tipo: 0,
        marca: 0,
        modelo: 0,
        num_serie: "",
        fch_entrada: "",
        fch_presu: "",
        fch_salida: "",
        costo_repuesto: 0,
        costo_mano_obra: 0,
        pendiente_pago: 0,
        reparacion: "",
        falla: "",
        aceptado: 0, 
    });

    {/* Table Variables */}
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Error al obtener los datos");
                const data = await response.json();

                const formattedData = data.map((repairs: any) => ({
                    ...repairs,
                    fch_entrada: repairs.fch_entrada ? formatDate(repairs.fch_entrada) : "-",
                    fch_presu: repairs.fch_presu ? formatDate(repairs.fch_presu) : "-",
                    fch_salida: repairs.fch_salida ? formatDate(repairs.fch_salida) : "-",
                }));
                console.log(formattedData);
                setData(formattedData);
            } catch (err) {
                // @ts-ignore
                setError(err.message);
            }
        };

        fetchData();
    }, []);    
    
    {/* Pagination Variables */}
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalItems = data.length;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    {/* Handles */}
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la reparacion');
            } else {
                console.log('Reparacion eliminada con exito');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitRepair = async () => {
        try {
            const response = await fetch(API_URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Error al crear la reparacion');
            } else {
                console.log('Reparacion creada con exito');
            };
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitRepair();
        setForm({
                cliente: 0,
                tipo: 0,
                marca: 0,
                modelo: 0,
                num_serie: "",
                fch_entrada: "",
                fch_presu: "",
                fch_salida: "",
                costo_repuesto: 0,
                costo_mano_obra: 0,
                pendiente_pago: 0,
                reparacion: "",
                falla: "",
                aceptado: 0, 
        });
        
    };

    return (
        <div className="bg-[#1a1f2e] flex flex-col h-screentext-white h-fit">
            <RepairForm
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <RepairTable 
                data={paginatedData} 
                handleDelete={handleDelete}
            />

            <RepairPag 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage} 
            />
        </div>
    );
};