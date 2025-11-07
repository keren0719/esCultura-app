import { useState,useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(""); // Solo participante u organizador
  const [roles, setRoles] = useState([]); // Solo participante u organizador
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Base URL configurable por .env
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
  // Ajusta la ruta del endpoint según tu backend (ej: /api/auth/register)
  const REGISTER_ENDPOINT = `${API_BASE}/users/createUser`;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${API_BASE}/roles/getAllRoles`);
        if (!res.ok) throw new Error("Error al obtener roles");
        const data = await res.json();
        setRoles(data);
        // Establecer primer rol por defecto
        if (data.length > 0) setRol(data[0].Id);
      } catch (err) 
      {
        console.error(err);
        setError("No se pudieron cargar los roles");
      }
    };
    fetchRoles();
  }, [API_BASE]);

const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas antes de llamar al backend
    if (!name.trim() || !email.trim() || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const payload = { name, email, password, rol };

      const res = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Si el backend responde con JSON de error, intentar leerlo
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Mensaje esperado en data.message o data.errors
        const msg =
          data?.message ||
          (data?.errors && Array.isArray(data.errors)
            ? data.errors.join(", ")
            : "Error en el registro");
        alert(msg);
        throw new Error(msg);
      }

      // Registro exitoso (backend puede devolver user, token, etc.)
      // Mostrar mensaje y redireccionar al login
      alert("✅ Registro exitoso. Ahora inicia sesión");
      navigate("/"); // Redirigir al login
    }
     catch (err) 
    {
      const msg = err?.message || "No se pudo registrar. Intenta de nuevo.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1575467679956-66b95a50b63c?auto=format&fit=crop&w=1470&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-80 animate-fadeIn border-l-4 border-orange-400">
        <div className="flex justify-center mb-4">
          <img
            src="/escultura-logo.png"
            alt="Logo esCultura"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Crear cuenta en <span className="text-orange-700">esCultura</span>
        </h2>

        <form onSubmit={handleRegister} className="space-y-3 mt-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-2 border border-orange-300 rounded-lg outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border border-orange-300 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border border-orange-300 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Selección de rol solo entre participante u organizador */}
          <div className="text-sm font-semibold text-gray-700">Tipo de usuario:</div>
          <select
            className="w-full p-2 border border-orange-300 rounded-lg outline-none bg-white"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            disabled={roles.length === 0}
          >
            {roles.length === 0 ? (
                <option>Cargando roles...</option>
              ) : (
                roles.map((r) => (
                  <option key={r.Id} value={r.Id}>
                    {r.Nombre}
                  </option>
                ))
              )}
          </select>

          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 mt-2">
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="text-orange-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
