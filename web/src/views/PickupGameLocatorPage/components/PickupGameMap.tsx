import React, { useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
 
const PickupGameMap = (): JSX.Element => {
  const [longitude, setLongitude] = useState(-122.4);
  const [latitude, setLatitude] = useState(37.8);
  const [zoom, setZoom] = useState(14);

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default PickupGameMap;