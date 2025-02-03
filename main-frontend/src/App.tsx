import { useState } from "react";
import { FaHome, FaUser, FaCog, FaPowerOff, FaAlignJustify } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Inicio");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 p-3 pt-8 transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"} flex flex-col relative justify-between`}
      >
        <div className="space-y-6">
          <SidebarItem icon={<FaAlignJustify />} text="Expandir" isOpen={isOpen} setSelected={() => setIsOpen(!isOpen)} />
          <SidebarItem icon={<FaHome />} text="Inicio" isOpen={isOpen} setSelected={setSelected} />
          <SidebarItem icon={<FaUser />} text="Perfil" isOpen={isOpen} setSelected={setSelected} />
          <SidebarItem icon={<FaCog />} text="Configuración" isOpen={isOpen} setSelected={setSelected} />
        </div>

        <SidebarItem icon={<FaPowerOff />} text="Salir" isOpen={isOpen} setSelected={() => console.log("Apagar")} />
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 p-10 text-xl bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold">{selected}</h1>
        <p className="mt-4">Contenido dinámico de la sección: {selected}</p>
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
      className={`text-xl flex-shrink-0 transition-all duration-300 p-2 
        ${isOpen 
          ? "hover:bg-gray-600 hover:rounded-md"  // Fondo gris rectangular cuando está abierto
          : "hover:bg-gray-600 hover:rounded-full"  // Fondo gris redondeado cuando está cerrado
        }`}
    >
      {icon}
    </span>
    <span
      className={`text-base transition-opacity duration-300 
        ${isOpen ? "opacity-100" : "opacity-0"} hover:text-white hover:bg-gray-600 hover:rounded-md p-1.5 w-full`
      }
    >
      {text}
    </span>
  </li>
);

export default Sidebar;