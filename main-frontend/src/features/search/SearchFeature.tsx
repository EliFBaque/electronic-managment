import React, { useState } from 'react';

import RepairTable from './components/RepairTable';
import Filters from './components/Filters';
import DetailModal from './components/RepairDetailModal';
import Paginator from './components/Paginator';
/* Mock Data */
import { repairsMock } from './data/repairs';

export default function SearchFeature() {
  const [filters, setFilters] = useState({
    id: '',
    cliente: '',
    modelo: '',
    aceptado: '',
    marca: '',
    tipo: '',
    nroSerie: ''
  });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredRepairs = repairsMock.filter(repair =>
    Object.entries(filters).every(([key, value]) =>
      value === '' || repair[key as keyof typeof repair]?.toString().toLowerCase().includes(value.toLowerCase())
    )
  );
  
  const indexOfLastRepair = currentPage * itemsPerPage;
  const indexOfFirstRepair = indexOfLastRepair - itemsPerPage;
  const currentRepairs = filteredRepairs.slice(indexOfFirstRepair, indexOfLastRepair);

  const totalPages = Math.ceil(repairsMock.length / itemsPerPage);

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

  {/* Does Nothing */}
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-5 bg-[#1a1f2e] w-full overflow-y-auto">
      <Filters filters={filters} onFilterChange={handleFilterChange}/>
      <RepairTable repairs={currentRepairs} setSelectedItem={setSelectedItem} />
      {selectedItem && <DetailModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrev={handlePrev}
        onNext={handleNext}
        totalItems={repairsMock.length}
        itemsPerPage={itemsPerPage}
      />
    </div>  
  );
};
