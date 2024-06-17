import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { forwardRef, useEffect, useRef } from "react";
import L, { Map as LeafletMap } from "leaflet";
import { useMap } from "react-leaflet";

interface LeafletVelocityProps {}

const LeafletVelocity = forwardRef<LeafletMap | null, LeafletVelocityProps>((props, ref) => {
  const map = useMap();
  const velocityRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!map) return;

    let mounted = true;
    let windGbrLayer: L.Layer | null = null;
    let waterGbrLayer: L.Layer | null = null;
    let windGlobalLayer: L.Layer | null = null;

    fetch("https://onaci.github.io/leaflet-velocity/wind-global.json")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;

        windGlobalLayer = (L as any).velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "GBR Water",
            position: "bottomleft",
            emptyString: "No water data"
          },
          data: data,
          maxVelocity: 0.6,
          velocityScale: 0.1 // arbitrary default 0.005
        });

        if (velocityRef.current && windGlobalLayer)
          velocityRef.current.addLayer(windGlobalLayer);
      })
      .catch((err) => console.log(err));

    fetch("https://onaci.github.io/leaflet-velocity/wind-gbr.json")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;

        windGbrLayer = (L as any).velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "GBR Wind",
            position: "bottomleft",
            emptyString: "No wind data",
            showCardinal: true
          },
          data,
          maxVelocity: 10
        });

        if (velocityRef.current && windGbrLayer)
          velocityRef.current.addLayer(windGbrLayer);
      })
      .catch((err) => console.log(err));

    fetch("https://onaci.github.io/leaflet-velocity/water-gbr.json")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;

        waterGbrLayer = (L as any).velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "GBR Water",
            position: "bottomleft",
            emptyString: "No water data"
          },
          data: data,
          maxVelocity: 0.6,
          velocityScale: 0.1 // arbitrary default 0.005
        });

        if (velocityRef.current && waterGbrLayer)
          velocityRef.current.addLayer(waterGbrLayer);
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
      if (velocityRef.current) {
        velocityRef.current.removeLayer(windGbrLayer!);
        velocityRef.current.removeLayer(waterGbrLayer!);
        velocityRef.current.removeLayer(windGlobalLayer!);
      }
    };
  }, [map]);

  return null;
});

export default LeafletVelocity;
