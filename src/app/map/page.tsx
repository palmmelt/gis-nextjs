"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Page() {
  return (
    <div className="flex-1 relative">
      <MapContainer
        center={[13.7366, 100.4995]}
        zoom={6}
        scrollWheelZoom={false}
        zoomControl={false} 
        style={{ height: "100vh", width: "100vw" ,zIndex:"1"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      </MapContainer>
    </div>
  );
}
