import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Location({ location, setLocation }) {
  const defaultPosition = [10.391, -75.4794]; // Cartagena

  // Componente interno para manejar clic en el mapa
  function ClickHandler() {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
      setLocation({ name: "Ubicación seleccionada", lat, lng });
    });
    return null;
  }

  return (
    <div>
      <p className="text-gray-300 mb-2">📍 Haz click en el mapa para seleccionar ubicación</p>
      <MapContainer
        center={location.lat && location.lng ? [location.lat, location.lng] : defaultPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        />
        {location.lat && location.lng && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>{location.name}</Popup>
          </Marker>
        )}
        <ClickHandler />
      </MapContainer>
    </div>
  );
}

export default Location;
