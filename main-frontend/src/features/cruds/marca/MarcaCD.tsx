import { useState, useEffect } from "react";
import MarcaForm from "./components/MarcaForm";
import MarcaTable from "./components/MarcaTable";
import MarcaPag from "./components/MarcaPag";

const API_URL = 'http://localhost:8000/api/marca/';

export default function MarcaCD() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        name: "",
    });

    {/* Table Variables */}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Error al obtener los datos");
                const data = await response.json();
                setData(data);
            } catch (err) {
                // @ts-ignore
                setError(err.message);
            }
        };

        fetchData();
    }, []); 

    {/* Pagination Variables */}
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = data.length;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

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
                throw new Error('Error al eliminar la Marca');
            } else {
                console.log('Marca eliminada con exito');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitMarca = async () => {
        try {
            const response = await fetch(API_URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Error al crear la Marca');
            } else {
                console.log('Marca creada con exito');
            };
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitMarca();
        setForm({
            name: "",
        });
        console.log(form);
    };

    return (
        <div className="bg-[#1a1f2e] flex flex-col h-screentext-white h-fit">
            <MarcaForm
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <MarcaTable 
                data={paginatedData} 
                handleDelete={handleDelete}
            />
            <MarcaPag 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage} 
            />
        </div>
    );
};