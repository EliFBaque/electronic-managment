// @ts-ignore
import React from "react";

interface ClienteTableProps {
  data: any[];
  handleDelete: (id: number) => void;
}

export default function ClienteTable({
  data,
  handleDelete,
}: ClienteTableProps) {
  return (
    <div className="px-2">
    <div className="overflow-hidden sticky w-full mt-4">
      <table className="w-full table-auto border-collapse border border-gray-600">
        <thead className="bg-gray-700 text-white text-center">
          <tr>
            <th className="px-4 py-2 border cursor-default border-gray-600">ID</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Nombre</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Direccion</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Numeros</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Email</th>
            <th className="px-4 py-2 border cursor-default border-gray-600">Contacto</th>
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
              <td className="px-4 py-2 border border-gray-700 text-center cursor-default">
                {item.address}
              </td>
              <td className="px-4 py-2 border border-gray-700 cursor-default">
                <div className="flex flex-col gap-1">
                  <span>Personal: {item.personal_phone}</span>
                  <span>Trabajo: {item.work_phone}</span>
                  <span>Celular: {item.cellphone}</span>
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-700 text-center cursor-default">
                {item.email}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-center cursor-default">
                {item.contact}
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