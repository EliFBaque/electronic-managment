import React, { useState, useEffect } from 'react';

// Local imports 
import RepairTable from './components/RepairTable';
import Filters from './components/Filters';
import DetailModal from './components/RepairDetailModal';
import Paginator from './components/Paginator';

// API URL
const API_URL = 'http://localhost:8000/api/reparaciones/';

export default function SearchFeature() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    id: '',
    cliente: '',
    tipo: '',
    marca: '',
    modelo: '',
    serial_num: '',
    entry_date: '',
    delivery_date: ''
  });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Fetch de reparaciones
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        console.log(data);
        setRepairs(data);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  // Filtrar reparaciones según los filtros ingresados
  const filteredRepairs = repairs.filter(repair => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === '') return true;
  
      if (key === 'entry_date_min' || key === 'delivery_date_max') {

        if (key === 'entry_date_min') {
          //@ts-ignore
          const repairDate = new Date(repair.entry_date);
          const filterDate = new Date(value);
          return repairDate >= filterDate;
        }
  
        if (key === 'delivery_date_max') {
          //@ts-ignore
          const repairDate = new Date(repair.delivery_date);
          const filterDate = new Date(value);
          return repairDate <= filterDate; 
        }
      }
  
      // Filtro por texto para los demás campos
      return String(repair[key as keyof typeof repair])?.toLowerCase().includes(value.toLowerCase());
    });
  });

  const indexOfLastRepair = currentPage * itemsPerPage;
  const indexOfFirstRepair = indexOfLastRepair - itemsPerPage;
  const currentRepairs = filteredRepairs.slice(indexOfFirstRepair, indexOfLastRepair);

  const totalPages = Math.ceil(filteredRepairs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleResetDate = (field: string) => {
    setFilters({ ...filters, [field]: '' });
  };
  // Add more styling to the loading and error, add animation for loading, and center the two messages
  if (loading) return <p className="text-white">Cargando datos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-5 bg-[#1a1f2e] w-full overflow-y-auto">
      <Filters filters={filters} onFilterChange={handleFilterChange}  onResetDate={handleResetDate}/>
      <RepairTable repairs={currentRepairs} setSelectedItem={setSelectedItem} />
      {selectedItem && <DetailModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrev={handlePrev}
        onNext={handleNext}
        totalItems={filteredRepairs.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};