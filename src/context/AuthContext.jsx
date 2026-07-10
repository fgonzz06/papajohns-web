import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../api/client";

const AuthContext = createContext(null);
const TOKEN_KEY = "pj_token";
const USER_KEY  = "pj_user";

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  // Sincroniza el token en el cliente axios cada vez que cambia
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [token]);

  function saveSession(data) {
    // El backend puede devolver { token, user } o { token, name, email } — cubrimos ambos
    const newToken = data.token;
    const newUser  = data.user ?? { name: data.name, email: data.email };
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  async function register({ name, email, password }) {
    try {
      const { data } = await apiClient.post("/auth/register", { name, email, password });
      saveSession(data);
      return { ok: true };
    } catch (err) {
      const msg = err?.response?.data?.message || "Error al registrarse. Intenta de nuevo.";
      return { ok: false, error: msg };
    }
  }

  async function login({ email, password }) {
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      saveSession(data);
      return { ok: true };
    } catch (err) {
      const msg = err?.response?.data?.message || "Correo o contraseña incorrectos.";
      return { ok: false, error: msg };
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}