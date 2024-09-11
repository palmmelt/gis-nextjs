import L from 'leaflet';
import 'leaflet-geotiff'; // Import leaflet-geotiff library
import 'leaflet-geotiff/dist/leaflet-geotiff-plotty'; // Import leaflet-geotiff-plotty for visualization
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {};

function GeoTiff({}: Props) {
  const map = useMap();

  useEffect(() => {


    const geotiffUrl = 'https://github.com/GeoTIFF/test-data/blob/main/files/LisbonElevation.tif';

    const geoTiffLayer = (L as any).leafletGeotiff(geotiffUrl, {
      band: 0,
      renderer: (L as any).LeafletGeotiff.plotty({
        displayMin: 0,
        displayMax: 1,
        clampLow: false,
        clampHigh: true,
        colorScale: 'viridis'
      })
    }).addTo(map);

    map.fitBounds(geoTiffLayer.getBounds());

  }, [map]);

  return null;
}

export default GeoTiff;
