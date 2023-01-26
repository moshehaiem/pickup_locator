import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { GeolocateControl, Map, MapRef, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PickupGamePopup from './PickupGamePopup';
 
const PickupGameMap = (): JSX.Element => {
  const [location, setLocation] = useState<any>(null);
  const [viewport, setViewport] = useState<any>(null);
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
        {
          "latitude": 34.05794190025496, "longitude": -118.39487760130953, "athletesPresent": 6,
          "athletesNeeded": 10, "startTime": new Date().toISOString().substring(0, 16),
          "endTime": new Date().toISOString().substring(0, 16), "message": 'Come hoop we got good games!'
        }
      ].map((loc, index) => (
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

  useEffect(() => {
    if(!viewport){
      navigator.geolocation.getCurrentPosition(pos => {
        setViewport({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: 18
        });
      }, () => setViewport({
        latitude: 10,
        longitude: 10,
        zoom: 18
      }));
    }
  }, [viewport]);


  return (
    <div>
    {viewport && (
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={viewport}
        mapboxAccessToken=''
        style={{width: 1000, height: 800}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={(e) => handleMapClick({"latitude": e.lngLat.lat, "longitude": e.lngLat.lng, "athletesPresent": null, "athletesNeeded": null, "startTime": null,
        "endTime": null, "message": null})}>
        <GeolocateControl />
        {locationMarkers}
        {location && (
          <Popup longitude={location.longitude} latitude={location.latitude}
            key={location.longitude + location.latitude}
            anchor="top"
            onClose={() => setLocation(null)}>
            <PickupGamePopup location={location} />
          </Popup>)
        }
      </Map>
      )}
    </div>
  );
}

export default PickupGameMap;