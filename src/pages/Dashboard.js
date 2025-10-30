import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Location from "./Location";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState({ name: "Todos", lat: null, lng: null });

  // ✅ Eventos predefinidos
  const initialEvents = [
    { id: 1, name: "Patinaje Artístico en Bocagrande", category: "Deporte", date: "2025-10-05", location: "Bocagrande", price: "Gratis", age: "Todo público", description: "Competencia y exhibición de patinaje artístico.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b5d8c94f?auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Festival de Champeta 'El Imperio'", category: "Festival", date: "2025-11-12", location: "Getsemaní", price: "Pago", age: "Jóvenes y adultos", description: "Noche de champeta y talento cartagenero.", image: "https://images.unsplash.com/photo-1533236893850-9b5985c4d4f8?auto=format&fit=crop&w=800&q=60" },
    { id: 3, name: "Concierto de Salseros en Plaza Santo Domingo", category: "Concierto", date: "2025-12-01", location: "Plaza Santo Domingo", price: "Pago", age: "Todo público", description: "Salseros locales e invitados especiales.", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=60" },
    { id: 4, name: "Feria Gastronómica: Sabores de Cartagena", category: "Comida", date: "2025-10-20", location: "Centro de Convenciones", price: "Pago", age: "Todo público", description: "Muestra gastronómica típica e internacional.", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60" },
    { id: 5, name: "Exposición 'Colores del Caribe'", category: "Exposición", date: "2025-09-28", location: "Museo de Arte Moderno", price: "Gratis", age: "Todo público", description: "Obras de artistas del Caribe colombiano.", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=60" },
    { id: 6, name: "Concierto: Silvestre D. (Tributo)", category: "Concierto", date: "2025-12-10", location: "Estadio", price: "Pago", age: "Adultos", description: "Tributo a Silvestre Dangond con orquesta en vivo.", image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=60" },
    { id: 7, name: "Festival de Comida Callejera", category: "Comida", date: "2025-12-05", location: "Getsemaní", price: "Pago", age: "Todo público", description: "Sabores locales, food trucks y música en vivo.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" },
    { id: 8, name: "Taller de Cerámica para Niños", category: "Taller", date: "2025-10-28", location: "Casa de la Cultura", price: "Gratis", age: "Niños", description: "Taller artístico y creativo para niños.", image: "https://images.unsplash.com/photo-1526312426976-11aa75d1cf36?auto=format&fit=crop&w=800&q=60" },
    { id: 9, name: "Concierto de Jazz en la Plaza", category: "Concierto", date: "2025-10-28", location: "Plaza Santo Domingo", price: "Pago", age: "Adultos", description: "Noche de jazz con artistas invitados.", image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=60" },
    { id: 10, name: "Encuentro de Arte Callejero", category: "Arte", date: "2025-11-18", location: "Getsemaní", price: "Gratis", age: "Todo público", description: "Graffiti, murales y arte urbano en Cartagena.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60" },
  ];

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      navigate("/"); // No hay usuario logueado
      return;
    }

    setUser(loggedUser);

    // Redirige organizadores al panel correspondiente
    if (loggedUser.role?.toLowerCase().trim() === "organizador") {
      navigate("/organizer");
      return;
    }

    // Cargar eventos aprobados
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const approvedEvents = storedEvents.filter((evt) => evt.status === "approved");
    setEvents([...initialEvents, ...approvedEvents]);
  }, [navigate]);

  // Filtrado de eventos
  const filteredEvents = events.filter((e) => {
    const eventName = (e.name || e.title || "").toLowerCase();
    const eventCategory = e.category || "Sin categoría";
    const eventLocation = e.location || "Sin ubicación";
    const eventDate = e.date || "";

    const matchesSearch = eventName.includes(search.toLowerCase());
    const matchesCategory = category === "Todos" || eventCategory === category;
    const matchesLocation = location.name === "Todos" || eventLocation === location.name;
    const matchesDate = !selectedDate || eventDate === selectedDate.toISOString().split("T")[0];

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-orange-400">🎭 esCultura</h1>
            <p className="text-sm text-gray-300">
              {user ? `Hola, ${user.name}. Explora los eventos culturales en Cartagena.` : ""}
            </p>
          </div>
          <button onClick={handleLogout} className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">
            Cerrar sesión
          </button>
        </div>

        {/* FILTROS */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="🔍 Buscar evento"
              className="p-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
            >
              <option value="Todos">🎭 Tipo de evento</option>
              <option value="Concierto">Concierto</option>
              <option value="Festival">Festival</option>
              <option value="Exposición">Exposición</option>
              <option value="Comida">Comida</option>
              <option value="Deporte">Deporte</option>
              <option value="Arte">Arte</option>
              <option value="Taller">Taller</option>
            </select>

            {/* MAPA PARA SELECCIÓN DE UBICACIÓN */}
            <div className="col-span-full lg:col-span-1">
              <Location location={location} setLocation={setLocation} />
            </div>
          </div>
        </div>

        {/* TARJETAS DE EVENTOS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 rounded-2xl shadow-lg overflow-hidden border border-orange-400 hover:scale-[1.02] transition-transform"
              >
                {event.image && (
                  <img src={event.image} alt={event.name || event.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-orange-300 mb-1">
                    {event.name || event.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-1">📍 {event.location}</p>
                  <p className="text-sm text-gray-400 mb-1">🗓️ {new Date(event.date).toLocaleDateString("es-ES")}</p>
                  <p className="text-gray-200 text-sm mb-3">{event.description}</p>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm w-full"
                  >
                    Ver más
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">😕 No se encontraron eventos.</p>
          )}
        </div>

        {/* MODAL DETALLE EVENTO */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-lg relative">
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
                onClick={() => setSelectedEvent(null)}
              >
                ✖
              </button>
              {selectedEvent.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name || selectedEvent.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-orange-400 mb-2">
                {selectedEvent.name || selectedEvent.title}
              </h2>
              <p className="text-gray-300 mb-1">
                📍 {selectedEvent.location} | 🗓️{" "}
                {new Date(selectedEvent.date).toLocaleDateString("es-ES")}
              </p>
              <p className="text-gray-400 mt-3">{selectedEvent.description}</p>
              {selectedEvent.video && (
                <video src={selectedEvent.video} controls className="w-full h-40 object-cover rounded-lg mt-3" />
              )}
            </div>
          </div>
        )}

        {/* CALENDARIO */}
        <div className="mt-16 bg-gray-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">📅 Filtra por fecha</h2>
          <div className="flex justify-center">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-lg p-2 bg-white text-black shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
