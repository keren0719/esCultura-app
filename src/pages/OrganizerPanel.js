import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

function OrganizerPanel() {
  const [events, setEvents] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const role = loggedUser?.role?.toLowerCase().trim();

  useEffect(() => {
    // Cargar todos los eventos creados por este usuario
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const myEvents = storedEvents.filter(evt => evt.createdBy === loggedUser.email);
    setEvents(myEvents);
  }, [loggedUser.email]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-8 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1470&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-5xl text-white">
        <h1 className="text-4xl font-bold text-orange-400 drop-shadow mb-6 text-center">
          Panel del Organizador 🎭
        </h1>

        <div className="flex justify-center mb-6">
          <Link
            to="/create-event"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition flex gap-2 items-center"
          >
            ➕ Crear nuevo evento
          </Link>
        </div>

        {/* Lista de eventos del organizador */}
        {events.length === 0 ? (
          <p className="text-center text-white text-lg">
            Aún no has creado ningún evento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(evt => (
              <div
                key={evt.id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300"
              >
                {evt.image && (
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4 text-gray-900">
                  <h3 className="text-xl font-bold">{evt.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{evt.description}</p>
                  <p className="text-sm font-semibold mt-2">📍 {evt.location}</p>
                  <p className="text-xs">📆 {evt.date}</p>
                  <p className="text-xs mt-1 font-semibold">👥 Cupos: {evt.quota}</p>
                  <p className="text-xs text-gray-700 mt-1">🎨 Categoría: {evt.category}</p>

                  {/* Estado del evento */}
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold mt-3 inline-block ${
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
                      : "⏳ Pendiente de aprobación"}
                  </span>

                  {/* ❌ Botones solo para admin, nunca para organizador */}
                  {role === "admin" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white text-xs font-semibold"
                        onClick={() => aprobarEvento(evt.id)}
                      >
                        Aprobar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-xs font-semibold"
                        onClick={() => rechazarEvento(evt.id)}
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ❌ Organizador no puede aprobar, por eso las funciones están vacías
  function aprobarEvento(id) {}
  function rechazarEvento(id) {}
}

export default OrganizerPanel;
