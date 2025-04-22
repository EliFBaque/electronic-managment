// @ts-ignore
import React from "react";

interface MarcaTableProps {
  data: any[];
  handleDelete: (id: number) => void;
}

export default function MarcaTable({
  data,
  handleDelete,
}: MarcaTableProps) {
  return (
    <div className="px-2">
    <div className="overflow-hidden sticky w-full mt-4">
      <table className="w-full table-auto border-collapse border border-gray-600">
        <thead className="bg-gray-700 text-white text-center">
          <tr>
            <th className="px-4 py-2 border cursor-default border-gray-600">ID</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Marca</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm bg-gray-800 text-white">
          {data.map((item: any) => (
            <tr key={item.id} className="hover:bg-gray-600 transition">
              <td className="px-4 py-2 border border-gray-700 text-center cursor-default">
                {item.id}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-center cursor-default">
                {item.name}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs cursor-pointer"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No hay datos disponibles.</p>
      )}
    </div>
    </div>
  );
}