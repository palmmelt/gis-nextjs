import type { FeatureCollection } from "geojson";

const chanWaterLevel: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { FLOW_ACCUM: "0", WaterLevel: "50" },
      geometry: { type: "Point", coordinates: [102.35693156719209, 12.761564329421189] },
    }
  ],
};

export default chanWaterLevel;
