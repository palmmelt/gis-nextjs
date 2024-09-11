"use client";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  GeoJSONProps,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "@fortawesome/fontawesome-free/css/all.css";
import "leaflet/dist/leaflet.css";

import L, { Icon, Layer, PathOptions, divIcon } from "leaflet";
import { useMenu } from "@/contexts/MenuContext";
import PopupMarkerSensor from "@/components/ui/layout_map/content_map/PopupMarkerSensor";
import ReactDOM from "react-dom";
// import GeoTiff from "@/components/ui/layout_map/content_map/GeoTiff";

interface FeatureProperties {
  ROUGHNESS?: string;
  KML_FOLDER?: string;
  ELEVATION?: string;
}

interface GeoJSONFeature {
  type: "Feature";
  properties: FeatureProperties;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

interface SensorData {
  data: GeoJSON.FeatureCollection;
}

interface PageComponentProps {
  sensor?: SensorData[];
}

export default function Page() {
  const [showGeoJSON, setShowGeoJSON] = useState(true);

  const [activeLayer, setActiveLayer] = useState("OpenStreetMap");

  const [popupContent, setPopupContent] = useState<string | null>(null);

  const { controlMonitor, handleControlChange } = useMenu();

  function onEachFeaturPipe(feature: any, layer: L.Layer) {
    if (feature.properties && feature.properties.KML_FOLDER) {
      layer.bindPopup(feature.properties.KML_FOLDER);
    }
  }

  function onEachFeatureCT(feature: any, layer: L.Layer) {
    if (feature.properties && feature.properties.ELEVATION) {
      layer.bindPopup("ระดับความสูง " + feature.properties.ELEVATION);
    }
  }

  const getColorRoughness = (roughness: string): string => {
    const value = parseFloat(roughness);
    return value > 0.01
      ? "#ff0000" // ROUGHNESS > 0.01
      : value > 0.005
      ? "#ffa500" // ROUGHNESS > 0.005
      : "#00ff00";
  };

  const geoJSONStyle = (feature: GeoJSONFeature): PathOptions => {
    const color = getColorRoughness(feature.properties.ROUGHNESS || "0");
    return {
      color: color,
      weight: 2,
      fillColor: color,
      fillOpacity: 0.5,
    };
  };

  const getFlowIcon = (
    angle: string,
    flowAccum: string,
    elevation: string
  ): L.DivIcon => {
    const rotationAngle = parseFloat(angle) || 0;
    const size = Math.min(30, Math.max(10, parseFloat(flowAccum) * 2));
    const color =
      parseFloat(elevation) > 200
        ? "rgb(255, 165, 0,0.8)"
        : "rgb(255, 0, 0,0.5)";

    if (angle === "N/A") {
      return L.divIcon({
        html: `<div class="fa-solid fa-house-flood-water-circle-arrow-right" style="color: rgb(0, 101, 221,0.8);" width="${size}" height="${size}" ></div>`,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    }

    return L.divIcon({
      html: `<div style="transform: rotate(${rotationAngle}deg); color: ${color};">
                <svg width="${size}" height="${size}" viewBox="0 0 24 24">
                  <path d="M12 2l4 10h-8l4-10z" fill="currentColor"/>
                </svg>
             </div>`,
      className: "flow-icon",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const geoJSONPointToLayer = (feature: any, latlng: L.LatLng) => {
    const {
      FLOW_ANGLE = "0",
      FLOW_ACCUM = "0",
      ELEVATION = "0",
    } = feature.properties;
    const icon = getFlowIcon(FLOW_ANGLE, FLOW_ACCUM, ELEVATION);
    return L.marker(latlng, { icon });
  };

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<i class="fa-solid fa-glass-water-droplet"></i>',
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const iconStyle = `
    .custom-icon i {
      font-size: 22px; 
      color: red;
    }
  `;

  const onEachFeature = (
    feature: { geometry: { type: string }; properties: { popupContent: any } },
    layer: {
      setIcon: (arg0: L.DivIcon) => void;
      bindPopup: (arg0: any) => void;
    }
  ) => {
    if (feature.geometry.type === "Point") {
      layer.setIcon(customIcon);

      if (feature.properties && feature.properties.popupContent) {
        const popupContent = feature.properties.popupContent;
        // สร้าง Popup ที่กำหนดเอง
        layer.bindPopup(
          L.popup().setContent(
            ReactDOMServer.renderToString(<PopupMarkerSensor markerValue={1} markerName="22" />)
          )
        );
      }
    }
  };

  const pipelinedata = controlMonitor[0].data?.filter((item) => item.status);
  const sensor = controlMonitor[1].data?.filter((item) => item.status);
  const ct = controlMonitor[2].data?.filter((item) => item.status);
  const flowdirection = controlMonitor[3].data?.filter((item) => item.status);
  const roughness = controlMonitor[4].data?.filter((item) => item.status);
  const damchan = controlMonitor[5].data?.filter((item) => item.status);

  const recivingpoint = controlMonitor[6].data?.filter((item) => item.status);

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={[12.60861, 102.10389]}
        zoom={10}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100vh", width: "100vw", zIndex: "1" }}
      >
        {activeLayer === "OpenStreetMap" && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {/* <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl> */}

        {/* ท่อ */}
        {pipelinedata?.map((pipe) => {
          return (
            <div key={uuidv4()}>
              <GeoJSON
                data={pipe.data}
                onEachFeature={onEachFeaturPipe}
                style={{
                  color: "black",
                  weight: 2,
                  fillColor: "black",
                  fillOpacity: 0.2,
                  opacity: 0.5,
                }}
              />
              {popupContent && <div>{popupContent}</div>}
            </div>
          );
        })}

        {/* เซนเซอร์ */}
        {sensor?.map((sslist, index) => {
          return (
            <div key={uuidv4()}>
              <style>{iconStyle}</style>
              <GeoJSON data={sslist.data} onEachFeature={onEachFeature} />
            </div>
          );
        })}

        {/* เส้นชั้นความสูง */}
        {ct?.map((ctlist) => {
          return (
            <div key={uuidv4()}>
              <GeoJSON
                data={ctlist.data}
                onEachFeature={onEachFeatureCT}
                style={{
                  color: "brown",
                  weight: 2,
                  fillColor: "brown",
                  fillOpacity: 0.2,
                  opacity: 0.5,
                }}
              />
              {popupContent && <div>ระดับความสูง {popupContent}</div>}
            </div>
          );
        })}

        {/* ทิศทางการไหลน้ำ */}
        {flowdirection?.map((f) => {
          return (
            <div key={uuidv4()}>
              <GeoJSON data={f.data} pointToLayer={geoJSONPointToLayer} />
            </div>
          );
        })}

        {/* ความหยาบพื้นผิว */}
        {roughness?.map((r) => {
          return (
            <div key={uuidv4()}>
              <GeoJSON data={r.data} style={geoJSONStyle} />
            </div>
          );
        })}

        {/* เขื่อน */}
        {damchan?.map((dc) => {
          return (
            <div key={uuidv4()}>
              <GeoJSON
                data={dc.data}
                style={{
                  color: "cyan",
                  weight: 2,
                  fillColor: "cyan",
                  fillOpacity: 0.2,
                  opacity: 0.5,
                }}
              />
            </div>
          );
        })}

        {/* บริเวณเขื่อน */}
        {/* <GeoJSON data={flowdam as GeoJSONData} style={geoJSONStyle} /> */}

        {/* จุดรับน้ำ */}
        {recivingpoint?.map((rp) => {
          return (
            <div key={uuidv4()}>
              <GeoJSON data={rp.data} />
            </div>
          );
        })}
        {/* <GeoJSON data={flowdampoint} /> */}
      </MapContainer>
    </div>
  );
}
