import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("participante"); // Solo participante u organizador
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validar email ya registrado
    if (users.some(u => u.email === email)) {
      alert("❌ Este correo ya está registrado");
      return;
    }

    // Guardar usuario (solo participante u organizador)
    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registro exitoso. Ahora inicia sesión");
    navigate("/"); // Redirigir al login
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="participante">Participante</option>
            <option value="organizador">Organizador</option>
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
