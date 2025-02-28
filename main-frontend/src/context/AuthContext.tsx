import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Funciona correctamente el login.
interface AuthContextType {
  user: any;
  login: (token: string, refresh: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const refreshToken = () => {
    const refresh = localStorage.getItem("refresh_token");
    if (refresh) {
      fetch("http://192.168.0.164:8000/api_token/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            setTimeout(refreshToken, 15 * 60 * 1000); // Refresca cada 15 minutos
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  };

  const login = (email: string, password: string) => {
    // Hacemos la llamada a la API para autenticar al usuario
    fetch(`http://192.168.0.164:8000/api_token/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),  // Enviar email y password
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data['refresh-token']) {
          // Guardamos los tokens si la respuesta es exitosa
          console.log(data)
          localStorage.setItem("my-jwt", data.token);
          localStorage.setItem("my-jwt-refresh-token", data['refresh-token']);
          setUser(data);  // Establecer el usuario
        } else {
          alert("Credenciales incorrectas");
        }
      })
      .catch(() => {
        alert("Error de conexión");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
