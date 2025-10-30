import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    quota: "",
    category: "Música",
    status: "pending",            // Siempre pendiente al crear
    createdBy: loggedUser.email,  // Email del organizador
    image: "",
    video: ""
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEvent({ ...event, [e.target.name]: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push({ ...event, id: Date.now() });

    localStorage.setItem("events", JSON.stringify(events));

    alert("✅ Evento enviado. Esperando aprobación ✅");

    // Navegar según el rol del usuario
    if (loggedUser.role.toLowerCase() === "admin") {
      navigate("/admin");       // Admin vuelve a su panel
    } else if (loggedUser.role.toLowerCase() === "organizador") {
      navigate("/organizer");   // Organizador vuelve a su panel
    } else {
      navigate("/events");      // Participante o cualquier otro rol
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1515165562835-c4c4bde5ec52?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 border-l-4 border-orange-500">
        
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Crear Nuevo Evento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input type="text" name="title" placeholder="Título del evento"
            className="w-full p-3 border rounded-lg" onChange={handleChange} required />

          <textarea name="description" placeholder="Descripción"
            className="w-full p-3 border rounded-lg" onChange={handleChange} required />

          <input type="datetime-local" name="date"
            className="w-full p-3 border rounded-lg" onChange={handleChange} required />

          <input type="text" name="location" placeholder="Ubicación"
            className="w-full p-3 border rounded-lg" onChange={handleChange} required />

          <input type="number" name="quota" placeholder="Cupos disponibles"
            className="w-full p-3 border rounded-lg" onChange={handleChange} required />

          <select name="category"
            className="w-full p-3 border rounded-lg bg-white"
            onChange={handleChange}>
            <option>Música</option>
            <option>Teatro</option>
            <option>Gastronomía</option>
            <option>Historia</option>
            <option>Artesanía</option>
            <option>Danza</option>
          </select>

          <div className="text-gray-700 text-sm font-semibold">Imagen del evento</div>
          <input type="file" accept="image/*" name="image"
            className="w-full p-1" onChange={handleFile} />

          {event.image && (
            <img src={event.image} alt="preview" className="w-full h-32 object-cover rounded-lg" />
          )}

          <div className="text-gray-700 text-sm font-semibold mt-2">Video promocional (opcional)</div>
          <input type="file" accept="video/*" name="video"
            className="w-full p-1" onChange={handleFile} />

          {event.video && (
            <video src={event.video} controls className="w-full h-32 object-cover rounded-lg"></video>
          )}

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold mt-3">
            🚀 Publicar Evento
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
