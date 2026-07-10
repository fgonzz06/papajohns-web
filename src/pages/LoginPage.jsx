import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/ui/Icon";

const BENEFITS = [
  "Realiza tus compras de manera más ágil.",
  "Guarda múltiples direcciones de envío y facturación.",
  "Realiza el seguimiento a tus compras y revisa tus pedidos realizados.",
  "Haz una lista de productos favoritos.",
];

const inputCls =
  "w-full rounded-lg border border-black/20 bg-white px-4 py-3 text-sm text-ink-950 placeholder:text-ink-950/30 focus:border-forest-700 outline-none transition-colors";

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
  e.preventDefault();
  setErrorMsg("");
  if (!email.trim() || !password) {
    setErrorMsg("Completa tu correo y contraseña.");
    return;
  }
  const res = await login({ email: email.trim().toLowerCase(), password });
  if (!res.ok) return setErrorMsg(res.error);
  navigate("/");
  }  

  async function handleRegister(e) {
  e.preventDefault();
  setErrorMsg("");
  if (!name.trim() || !email.trim() || password.length < 6) {
    setErrorMsg("Completa nombre, correo y una contraseña de al menos 6 caracteres.");
    return;
  }
  const res = await register({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
  if (!res.ok) return setErrorMsg(res.error);
  navigate("/");
  }

  const canSubmitLogin = email.trim() && password;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Columna izquierda: iniciar sesión o registro */}
      <section className="max-w-md w-full mx-auto">
        <h1 className="font-display text-2xl font-extrabold text-ink-950 text-center uppercase mb-8">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-5">
          {mode === "register" && (
            <div>
              <label htmlFor="name" className="block text-sm text-ink-950 mb-1.5">
                Nombre completo <span className="text-discount">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Nina Quispe"
                className={inputCls}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-ink-950 mb-1.5">
              Correo electrónico <span className="text-discount">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. nombre@mail.com"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-ink-950 mb-1.5">
              Contraseña <span className="text-discount">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Aa12345"
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-950/50 hover:text-ink-950"
              >
                <Icon name="eye" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {mode === "login" && (
            <button
              type="button"
              onClick={() => setErrorMsg("Función simulada: crea una cuenta nueva si olvidaste tu contraseña.")}
              className="text-sm text-ink-950/70 hover:text-forest-700"
            >
              Olvidé mi contraseña
            </button>
          )}

          {errorMsg && (
            <p role="alert" className="text-sm text-discount font-medium">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className={`w-full rounded-full font-bold py-3.5 uppercase transition-colors ${
              (mode === "login" ? canSubmitLogin : true)
                ? "bg-lime-400 hover:bg-lime-500 text-forest-700"
                : "bg-lime-200 text-forest-700/60"
            }`}
          >
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>

          <p className="text-xs text-ink-950/50 text-center">
            Cuenta simulada (demo académica): se guarda solo en tu navegador.
          </p>
        </form>
      </section>

      {/* Columna derecha: panel crear cuenta */}
      <section className="bg-mist-100 rounded-md p-8 sm:p-12">
        <h2 className="font-display text-2xl font-extrabold text-ink-950 text-center uppercase mb-8">
          {mode === "login" ? "Crear cuenta" : "¿Ya tienes cuenta?"}
        </h2>
        <p className="font-bold text-sm text-ink-950 mb-4">
          Crea una y aprovecha los beneficios:
        </p>
        <ul className="space-y-3 mb-10">
          {BENEFITS.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-ink-950/80">
              <span className="text-discount font-bold" aria-hidden="true">•</span>
              {b}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setErrorMsg("");
          }}
          className="w-full bg-forest-700 hover:bg-forest-900 text-white font-bold rounded-full py-3.5 uppercase transition-colors"
        >
          {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </section>
    </main>
  );
}
