// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ClientePag({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setCurrentPage,
}: PaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (currentPage > 3) pages.push(1, "...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...", totalPages);

    return pages;
  };

  return (
    <div className="mt-2 mb-2 flex justify-between items-center text-sm text-white px-2">
      <div className="cursor-default">
        Mostrando{" "}
        {totalItems === 0
          ? "0 a 0"
          : `${(currentPage - 1) * itemsPerPage + 1} a ${Math.min(
              currentPage * itemsPerPage,
              totalItems
            )}`}{" "}
        de {totalItems} Clientes
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border border-[#3a4459] rounded hover:bg-[#2a3447] cursor-pointer"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {getPageNumbers().map((page, i) => (
          <button
            key={i}
            className={`px-3 py-1 border border-[#3a4459] hover:bg-[#2a3447] rounded cursor-pointer ${
              currentPage === page ? "bg-[#2a3447]" : ""
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 border border-[#3a4459] rounded hover:bg-[#2a3447] cursor-pointer"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}