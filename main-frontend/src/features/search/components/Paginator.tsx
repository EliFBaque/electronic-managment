import React from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  totalItems: number;
  itemsPerPage: number;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
  totalItems,
  itemsPerPage,
}) => {
  
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const pages = [];
    if (currentPage > 3) pages.push(1, '...');
    
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...', totalPages);

    return pages;
  };

  return (
    <div className="mt-2 flex justify-between items-center text-sm text-white">
      <div>
        Mostrando {totalItems === 0 ? "0 a 0" : `${(currentPage - 1) * itemsPerPage + 1} a ${Math.min(currentPage * itemsPerPage, totalItems)}`} de {totalItems} reparaciones
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border border-[#3a4459] rounded hover:bg-[#2a3447] transition-colors"
          onClick={onPrev}
          disabled={currentPage === 1}
        >
          ‹ Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 border border-[#3a4459] rounded transition-colors ${
              currentPage === page ? 'bg-[#2a3447]' : ''
            }`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 border border-[#3a4459] rounded hover:bg-[#2a3447] transition-colors"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Next ›
        </button>
      </div>
    </div>
  );
};

export default Paginator;