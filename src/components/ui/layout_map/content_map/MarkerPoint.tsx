import { Marker, Popup } from 'leaflet'
import React from 'react'

type Props = {}

function MarkerPoint({position}:any) {
  return (
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  )
}

export default MarkerPoint