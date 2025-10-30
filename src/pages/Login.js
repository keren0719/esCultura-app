import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario con email y password exactos
    const user = users.find(
      (u) => u.email.trim() === email.trim() && u.password.trim() === password.trim()
    );

    if (!user) {
      alert("❌ Correo o contraseña incorrectos");
      return;
    }

    // Guardar usuario logueado
    localStorage.setItem("loggedUser", JSON.stringify(user));

    // DEBUG: ver rol en consola
    console.log("ROL DEL USUARIO:", user.role);

    // Redirección según rol
    const role = user.role.toLowerCase().trim(); // normalizamos el string

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "organizador") {
      navigate("/organizer");
    } else if (role === "participante") {
      navigate("/events");
    } else {
      alert("Rol desconocido, contacta al administrador");
    }

    alert(`🎉 Bienvenido, ${user.name} 👋`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1575467679956-66b95a50b63c?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenedor del formulario */}
      <div className="relative bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-80 border-l-4 border-orange-400">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/escultura-logo.png"
            alt="Logo esCultura Cartagena"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Bienvenido a <span className="text-orange-700">esCultura</span>
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm">
          Descubre eventos y experiencias culturales en Cartagena
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-orange-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
