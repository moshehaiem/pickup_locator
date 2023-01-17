import React, { useState } from 'react';
import Map from 'react-map-gl';
 
const PickupGameMap = (): JSX.Element => {
  const [longitude, setLongitude] = useState(-122.4);
  const [latitude, setLatitude] = useState(37.8);
  const [zoom, setZoom] = useState(14);

  return (
    <Map
    mapboxAccessToken='***'
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: zoom
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default PickupGameMap;