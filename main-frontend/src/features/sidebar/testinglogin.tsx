import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();  // Obtener la función login del contexto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llamar directamente al login del contexto pasando los datos del formulario
    login(formData.email, formData.password);
  };

  return (
    <div className="p-5 bg-[#1a1f2e] w-full overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Iniciar sesión
        </button>
        
      </form>


    </div>
  );
}