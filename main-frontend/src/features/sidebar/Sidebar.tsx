import React, { useState } from 'react';
// @ts-ignore
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { FaAlignJustify, FaPlus, FaSearch } from 'react-icons/fa';
import { IoStatsChart } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";

import SearchFeature from '../search/SearchFeature';
import { AuthProvider } from '../../context/AuthContext';

import ModelsCD from '../cruds/ModelsCD';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 p-3 pt-8 transition-all duration-300 
        ${isOpen ? "w-64" : "w-21"} flex flex-col relative justify-between`}
      >
        <div className="space-y-6">
          <SidebarItem icon={<FaAlignJustify />} text="Minimizar" isOpen={isOpen} setSelected={() => setIsOpen(!isOpen)} />
          <SidebarItem icon={<FaSearch />} text="Buscar" isOpen={isOpen} setSelected={() => navigate("/buscar")} />
          <SidebarItem icon={<FaPlus />} text="Añadir" isOpen={isOpen} setSelected={() => navigate("/añadir")} />
          <SidebarItem icon={<IoStatsChart />} text="Estadísticas" isOpen={isOpen} setSelected={() => navigate("/estadística")} />
        </div>
        {/* Still need a login for update this button */}
        <SidebarItem icon={<FaPowerOff />} text="Salir" className="" isOpen={isOpen} setSelected={() => console.log("Apagar")} />
      </div>

      {/* Main Content */}
      <div className="flex-1 text-xl bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <AuthProvider>
        <Routes>
          <Route path="/buscar" element={<SearchFeature />} />
          <Route path="/añadir" element={<ModelsCD />}/>
          <Route path="/estadística" />
        </Routes>
        </AuthProvider>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  isOpen: boolean;
  setSelected: (text: string) => void;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isOpen, setSelected, className }) => (
  <li
    className={`flex items-center gap-4 w-full p-3 rounded-md cursor-pointer transition-all duration-300 ${className}`}
    onClick={() => setSelected(text)}
  >
    <span
      className={`text-xl flex-shrink-0 transition-all duration-300 p-2  hover:bg-gray-600 hover:rounded-full `}
    >
      {icon}
    </span>
    <p
      className={`text-base transition-opacity duration-300 
        ${isOpen ? "opacity-100" : "opacity-0"} hover:text-white  hover:rounded-md p-1.5 w-full`
      }
    >
      {text}
    </p>
  </li>
);

export default Sidebar;