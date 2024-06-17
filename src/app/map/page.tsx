"use client";
import { LayersControl, MapContainer, TileLayer,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import puchao from '@/data/test.json'
import LeafletVelocity from "@/components/ui/layout_map/content_map/LeafletVelocity";
import L from "leaflet";
import { useState } from "react";

export default function Page() {


    const [showGeoJSON, setShowGeoJSON] = useState(true);


  return (
    <div className="flex-1 relative">
      <MapContainer
        center={[13.668623, 100.515813]}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100vh", width: "100vw", zIndex: "1" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <GeoJSON
          data={puchao}
          style={() => ({
            color: 'rgba(0, 0, 0,0.1)',
            weight: 1,
            fillColor: 'rgba(0, 0, 0,0)',
            fillOpacity: 0.1
          })}
          pointToLayer={(feature, latlng) => (
            (L as any).circleMarker(latlng, {
              radius: 8,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            }).bindPopup(`<div>
              <p>FLOW_ACCUM: ${feature.properties.FLOW_ACCUM}</p>
              <p>FLOW_ANGLE: ${feature.properties.FLOW_ANGLE}</p>
              <p>ELEVATION: ${feature.properties.ELEVATION}</p>
            </div>`)
          )}
        />
          <LayersControl.Overlay checked name="Velocity Layer">
            <LeafletVelocity />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
