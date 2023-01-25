import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Map, MapRef, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PickupGamePopup from './PickupGamePopup';
 
const PickupGameMap = (): JSX.Element => {
  const [location, setLocation] = useState<any>(null);
  const mapRef = useRef<MapRef | null>(null);

  const flyToClickedPoint = useCallback((lng: number, lat: number): void => {
    if(mapRef && mapRef.current){
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 18
      });
    }
  }, [mapRef]);

  const handleMapClick = useCallback((loc: any): void => {
    if(mapRef && mapRef.current){
      flyToClickedPoint(loc.longitude, loc.latitude);
      setLocation(loc);
    }
  }, [flyToClickedPoint]);

  const locationMarkers = useMemo(
    () =>
      [
        {"latitude": 6, "longitude": 9, "athletesPresent": 6, "athletesNeeded": 10, "startTime": new Date(),
         "endTime": new Date(), "message": 'Come hoop we got good games!'}].map((loc, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={loc.longitude}
          latitude={loc.latitude}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            handleMapClick(loc)
          }}
        >
        </Marker>
      )),
    [handleMapClick]
  );

  console.log(location);


  return (
    <Map
      ref={mapRef}
      reuseMaps
      id="map"
      mapboxAccessToken='pk.eyJ1IjoibW9zaGVoYWllbSIsImEiOiJjbGNzaGtkZTAwcHM1M3BteHpld2FpdDB1In0.8sgxSa400qyrZXwxXbQjiQ'
      style={{width: 1000, height: 800}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={(e) => handleMapClick({"latitude": e.lngLat.lat, "longitude": e.lngLat.lng, "athletesPresent": null, "athletesNeeded": null, "startTime": null,
      "endTime": null, "message": null})}>
      {locationMarkers}
      {location && (
        <Popup longitude={location.longitude} latitude={location.latitude}
          anchor="top"
          onClose={() => setLocation(null)}>
          <PickupGamePopup location={location} />
        </Popup>)
      }
      </Map>
  );
}

export default PickupGameMap;