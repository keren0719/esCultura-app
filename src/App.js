import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import CreateEvent from "./pages/CreateEvent";
import OrganizerPanel from "./pages/OrganizerPanel";

// ✅ Función para obtener usuario logueado
const getLoggedUser = () => {
  return JSON.parse(localStorage.getItem("loggedUser"));
};

// ✅ Admin precargado (solo si no existe)
const users = JSON.parse(localStorage.getItem("users")) || [];
if (!users.some(u => u.role === "admin")) {
  users.push({
    name: "Admin Principal",
    email: "admin@escultura.com",
    password: "admin123",
    role: "admin"
  });
  localStorage.setItem("users", JSON.stringify(users));
}

function App() {
  const loggedUser = getLoggedUser();

  return (
    <Routes>
      {/* Login y Registro siempre accesibles */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard para participantes */}
      <Route 
        path="/events" 
        element={
          loggedUser ? <Dashboard /> : <Navigate to="/" />
        } 
      />

      {/* AdminPanel solo para admin */}
      <Route 
        path="/admin" 
        element={
          loggedUser?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />
        } 
      />

      {/* Crear evento: solo organizadores y admin */}
      <Route
        path="/create-event"
        element={
          loggedUser && (loggedUser.role === "organizador" || loggedUser.role === "admin") 
            ? <CreateEvent /> 
            : <Navigate to="/" />
        }
      />

      {/* OrganizerPanel solo para organizadores */}
      <Route
        path="/organizer"
        element={
          loggedUser?.role === "organizador" ? <OrganizerPanel /> : <Navigate to="/" />
        }
      />

      {/* Redirección por defecto si ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
