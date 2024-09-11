import * as d3 from 'd3';
import L from 'leaflet';
// import * as leafletField from 'ih-leaflet-canvaslayer-field/dist';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {};

function AscScalarMap({}: Props) {
  const map = useMap();

  useEffect(() => {
    d3.text('https://raw.githubusercontent.com/Zyllys/files/main/vVec.asc').then((u: any) => {
      d3.text('https://raw.githubusercontent.com/Zyllys/files/main/uVec.asc').then((v: any) => {
        console.log(u, v);
        let vf = (L as any).VectorField.fromASCIIGrids(u, v);
        let layer = (L as any).canvasLayer.vectorFieldAnim(vf).addTo(map);
        map.fitBounds(layer.getBounds());

        layer.on('click', function (e: { value: null; latlng: L.LatLngExpression }) {
          if (e.value !== null) {
            let vector = e.value;
            let v = (vector as any).magnitude().toFixed(2);
            let d = (vector as any).directionTo().toFixed(0);
            let html = `<span>${v} m/s to ${d}&deg</span>`;
            let popup = L.popup()
              .setLatLng(e.latlng)
              .setContent(html)
              .openOn(map);
          }
        });
      });
    });
  }, [map]);

  return null;
}

export default AscScalarMap;
