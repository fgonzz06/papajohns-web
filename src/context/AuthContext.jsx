import { createContext, useContext, useEffect, useState } from "react";

/**
 * Autenticación SIMULADA (demo académica): los "usuarios" viven en
 * localStorage del navegador. No hay backend de auth ni contraseñas
 * seguras — no usar nunca en producción.
 */
const AuthContext = createContext(null);

const SESSION_KEY = "pj_session";
const USERS_KEY = "pj_users";

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email }

  useEffect(() => {
    setUser(readJSON(SESSION_KEY, null));
  }, []);

  function register({ name, email, password }) {
    const users = readJSON(USERS_KEY, {});
    if (users[email]) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }
    users[email] = { name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session = { name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }

  function login({ email, password }) {
    const users = readJSON(USERS_KEY, {});
    const record = users[email];
    if (!record || record.password !== password) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    const session = { name: record.name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
