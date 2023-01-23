import React, { useState, useCallback, useEffect } from 'react';
import { Map, MapProvider, Popup, useMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
 
const PickupGameMap = (): JSX.Element => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState([0, 0]);
  const { current: map } = useMap();

  const flyToClickedPoint = useCallback((clickedPoint: any): void => {
    if(map){
      map.flyTo({
        center: clickedPoint.geometry.coordinates,
        zoom: 15
      });
    }
  }, [map]);

  const handleCreatePickupLocation = useCallback((event: any): void => {
    setShowPopup(true);
    setPopupCoordinates([event.point.x, event.point.y])
    console.log('create pickup location');
    console.log(event);
  }, []);

  const handleMapClick = useCallback((event: any): void => {
    console.log(map);
    if(map){
      const features = map.queryRenderedFeatures(event.point, {
        layers: ['locations']
      });
      if (!features.length){
        handleCreatePickupLocation(event);
      } else{
        const clickedPoint = features[0];
        flyToClickedPoint(clickedPoint);
      }
    }
  }, [flyToClickedPoint, handleCreatePickupLocation, map]);

  useEffect(() => {
    if (!map) {
      return undefined;
    }
  }, [map]);

  return (
    <MapProvider>
      <Map
        id="map"
        mapboxAccessToken=''
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={handleMapClick}>
          {showPopup && (
            <Popup longitude={popupCoordinates[0]} latitude={popupCoordinates[1]}
              anchor="bottom"
              onClose={() => setShowPopup(false)}>
              Add event
            </Popup>)
          }
        </Map>
    </MapProvider>
  );
}

export default PickupGameMap;