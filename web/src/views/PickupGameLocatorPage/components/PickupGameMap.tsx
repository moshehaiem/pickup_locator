import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Map, MapRef, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PickupGamePopup from './PickupGamePopup';
 
const PickupGameMap = (): JSX.Element => {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const mapRef = useRef<MapRef | null>(null);

  const location_markers = useMemo(
    () =>
      [
        {"lat": 6, "lng": 9, "athletesPresent": 6, "athletesNeeded": 10, "startTime": new Date(),
         "endTime": new Date(), "message": 'Come hoop we got good games!'}].map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.lng}
          latitude={location.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
        </Marker>
      )),
    []
  );

  const flyToClickedPoint = useCallback((lng: number, lat: number): void => {
    if(mapRef && mapRef.current){
      mapRef.current.flyTo({
        center: [lng, lat] ,
        zoom: 18
      });
    }
  }, [mapRef]);

  const handleCreatePickupLocation = useCallback((lng: number, lat: number): void => {
    setPopupInfo({"lat": lat, "lng": lng});
  }, []);

  const handleMapClick = useCallback((event: any): void => {
    console.log(popupInfo ? 'exists' : 'does not exist');
    setPopupInfo(null)
    if(mapRef && mapRef.current){
      flyToClickedPoint(event.lngLat.lng, event.lngLat.lat);
      handleCreatePickupLocation(event.lngLat.lng, event.lngLat.lat);
    }
  }, [flyToClickedPoint, handleCreatePickupLocation, popupInfo]);

  console.log(popupInfo);

  return (
    <Map
      ref={mapRef}
      reuseMaps
      id="map"
      mapboxAccessToken=''
      style={{width: 1000, height: 800}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={handleMapClick}>
      {location_markers}
      {popupInfo && (
        <Popup longitude={popupInfo.lng} latitude={popupInfo.lat}
          anchor="top"
          onClose={() => setPopupInfo(null)}>
          <PickupGamePopup />
        </Popup>)
      }
      </Map>
  );
}

export default PickupGameMap;