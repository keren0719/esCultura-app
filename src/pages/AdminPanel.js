import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminPanel() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = events.map(evt =>
      evt.id === id ? { ...evt, status: newStatus } : evt
    );
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  const removeEvent = (id) => {
    const filtered = events.filter(evt => evt.id !== id);
    setEvents(filtered);
    localStorage.setItem("events", JSON.stringify(filtered));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-8 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=1470&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-5xl text-white">
        <h1 className="text-4xl font-bold text-orange-400 drop-shadow mb-6 text-center">
          Panel de Administración
        </h1>

        <div className="flex justify-center mb-6">
          <Link
            to="/create-event"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition flex gap-2 items-center"
          >
            ➕ Crear Evento
          </Link>
        </div>

        {/* LISTA DE EVENTOS */}
        {events.length === 0 ? (
          <p className="text-center text-white text-lg">No hay eventos registrados aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(evt => (
              <div
                key={evt.id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300"
              >
                {/* Imagen */}
                {evt.image && (
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4 text-gray-900">
                  <h3 className="text-xl font-bold">{evt.title}</h3>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">{evt.description}</p>

                  <p className="text-sm font-semibold mt-2">
                    📍 {evt.location}
                  </p>
                  <p className="text-xs">📆 {evt.date}</p>

                  <span
                    className={`px-2 py-1 rounded text-xs font-bold mt-2 inline-block ${
                      evt.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : evt.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {evt.status === "approved"
                      ? "✅ Aprobado"
                      : evt.status === "rejected"
                      ? "❌ Rechazado"
                      : "⏳ Pendiente"}
                  </span>

                  {/* Botones */}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm"
                      onClick={() => updateStatus(evt.id, "approved")}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                      onClick={() => updateStatus(evt.id, "pending")}
                    >
                      ⏳ Pendiente
                    </button>
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                      onClick={() => updateStatus(evt.id, "rejected")}
                    >
                      ❌ Rechazar
                    </button>
                  </div>

                  <button
                    className="w-full mt-3 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white text-sm"
                    onClick={() => removeEvent(evt.id)}
                  >
                    🗑 Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
