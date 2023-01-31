import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FullscreenControl, GeolocateControl, Map, MapRef, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PickupGamePopup from './PickupGamePopup';
import useListLocations from '../../../hooks/location/useListLocations';

 
const PickupGameMap = (): JSX.Element => {
  const [location, setLocation] = useState<any>(null);
  const [viewport, setViewport] = useState<any>(null);
  const mapRef = useRef<MapRef | null>(null);

  const { data, isSuccess, isLoading } = useListLocations();
  

  const flyToClickedPoint = useCallback((lng: number, lat: number): void => {
    if(mapRef && mapRef.current){
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 18
      });
    }
  }, [mapRef]);

  const handleMapClick = useCallback((loc: any): void => {
      flyToClickedPoint(loc.longitude, loc.latitude);
      setLocation(loc);
  }, [flyToClickedPoint]);

  const locationMarkers = useMemo(
    () =>
    data?.pages[0].data.map((loc: any, index: number) => (
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
    [data?.pages, handleMapClick]
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
        onClick={(e) => handleMapClick({"latitude": e.lngLat.lat, "longitude": e.lngLat.lng, "athletes_present": null, "athletes_needed": null, "start_time": null,
        "end_time": null, "message": null})}>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
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