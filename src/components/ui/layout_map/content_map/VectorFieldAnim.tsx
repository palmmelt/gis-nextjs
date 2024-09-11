import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import "./VectorFieldAnim"; // ไฟล์ที่เราเก็บ custom layer ไว้

interface VectorFieldAnimProps {}

const VectorFieldAnim: React.FC<VectorFieldAnimProps> = () => {
  const map = useMap();
  const vectorFieldRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (!map) return;

    const vectorFieldData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [100.515813,13.668623] 
            },
            properties: {
              u: 0.5,
              v: 0.2,
              magnitude: 0.5385
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [100.5018, 14.7563] 
            },
            properties: {
              u: -0.3,
              v: 0.4,
              magnitude: 0.5
            }
          }
        ]
      };

    const fetchData = async () => {
      try {
        // const response = await axios.get("https://onaci.github.io/leaflet-velocity/water-gbr.js");
        // const velocityData = response.data;

        const vectorFieldLayer = (L as any).canvasLayer.vectorFieldAnim(vectorFieldData, {
          paths: 800,
          color: 'white',
          width: 1.0,
          fade: 0.96,
          duration: 20,
          maxAge: 200,
          velocityScale: 1 / 5000
        });

        console.log(vectorFieldLayer)

        vectorFieldLayer.addTo(map);
        vectorFieldRef.current = vectorFieldLayer;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      if (vectorFieldRef.current) {
        map.removeLayer(vectorFieldRef.current);
      }
    };
  }, [map]);

  return null;
};

export default VectorFieldAnim;
