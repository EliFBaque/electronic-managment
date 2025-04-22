import { useState, useEffect } from 'react';
import RepairForm from './components/RepairForm';
import RepairTable from './components/RepairTable';
import RepairPag from './components/RepairPag';

const API_URL = 'http://localhost:8000/api/reparaciones/';

export default function RepairsCD(){

    {/* Form Variables */}
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        cliente_id: 0,
        tipo_id: 0,
        marca_id: 0,
        modelo_id: 0,
        serial_num: "",
        entry_date: "",
        budget_date: "",
        delivery_date: "",
        spare_cost: 0,
        labor_cost: 0,
        pending_payment: 0,
        repair: "",
        failure: "",
        confirmation_id: 0, 
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

                const formattedData = data.map((repair: any) => ({
                    ...repair,
                    entry_date: repair.entry_date ? formatDate(repair.entry_date) : "-",
                    budget_date: repair.budget_date ? formatDate(repair.budget_date) : "-",
                    delivery_date: repair.delivery_date ? formatDate(repair.delivery_date) : "-",
                }));

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
                cliente_id: 0,
                tipo_id: 0,
                marca_id: 0,
                modelo_id: 0,
                serial_num: "",
                entry_date: "",
                budget_date: "",
                delivery_date: "",
                spare_cost: 0,
                labor_cost: 0,
                pending_payment: 0,
                repair: "",
                failure: "",
                confirmation_id: 0, 
        });
        console.log(form);
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