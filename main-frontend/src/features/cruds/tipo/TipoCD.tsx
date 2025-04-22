import { useState, useEffect } from "react";
import TipoForm from "./components/TipoForm";
import TipoTable from "./components/TipoTable";
import TipoPag from "./components/TipoPag";

const API_URL = 'http://localhost:8000/api/tipo/';

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
    const itemsPerPage = 8;
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
                throw new Error('Error al eliminar el Tipo');
            } else {
                console.log('Tipo eliminada con exito');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitTipo = async () => {
        try {
            const response = await fetch(API_URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Error al crear la Tipo');
            } else {
                console.log('Tipo creada con exito');
            };
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitTipo();
        setForm({
            name: "",
        });
        console.log(form);
    };

    return (
        <div className="bg-[#1a1f2e] flex flex-col h-screentext-white h-fit">
            <TipoForm
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <TipoTable 
                data={paginatedData} 
                handleDelete={handleDelete}
            />
            <TipoPag 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage} 
            />
        </div>
    );
};