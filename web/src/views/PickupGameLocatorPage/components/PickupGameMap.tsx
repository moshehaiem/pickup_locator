import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FullscreenControl, GeolocateControl, Map, MapRef, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PickupGamePopup from './PickupGamePopup';
import useListLocations from '../../../hooks/location/useListLocations';
import { Location } from '../../../types/Location';
import { CreateOrUpdateLocation } from '../../../types/CreateOrUpdateLocation';

interface IViewPortType {
  longitude: number;
  latitude: number;
  zoom: number;
}
 
const PickupGameMap = (): JSX.Element => {
  const today = new Date().toISOString().slice(0, 10)
  const [location, setLocation] = useState<CreateOrUpdateLocation | null>(null);
  const [viewport, setViewport] = useState<IViewPortType | null>(null);
  const [athletesNeededStart, setAthletesNeededStart] = useState(1);
  const [athletesPresentStart, setAthletesPresentStart] = useState(1);
  const [athletesNeededEnd, setAthletesNeededEnd] = useState(10);
  const [athletesPresentEnd, setAthletesPresentEnd] = useState(10);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const mapRef = useRef<MapRef | null>(null);

  const { data } = useListLocations({
    neLatitude: mapRef && mapRef.current && Math.ceil(mapRef.current.getBounds().getNorthEast().lat).toString(),
    neLongitude: mapRef && mapRef.current && Math.ceil(mapRef.current.getBounds().getNorthEast().lng).toString(),
    swLatidude: mapRef && mapRef.current && Math.floor(mapRef.current.getBounds().getSouthWest().lat).toString(),
    swLongitude: mapRef && mapRef.current && Math.floor(mapRef.current.getBounds().getSouthWest().lng).toString(),
    athletesNeededStart: athletesNeededStart.toString(),
    athletesNeededEnd: athletesNeededEnd.toString(),
    athletesPresentStart: athletesPresentStart.toString(),
    athletesPresentEnd: athletesPresentEnd.toString(),
    date,
    startTime,
    endTime,
    enabled: !!mapRef && !!mapRef.current
  });

  const flyToClickedPoint = useCallback((lng: number, lat: number): void => {
    if(mapRef && mapRef.current){
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 18
      });
    }
  }, [mapRef]);

  const handleMapClick = useCallback((loc: CreateOrUpdateLocation): void => {
      flyToClickedPoint(loc.longitude, loc.latitude);
      setLocation(loc);
  }, [flyToClickedPoint]);

  const locationMarkers = useMemo(
    () =>
    data?.data.map((loc: Location, index: number) => (
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
    [data, handleMapClick]
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
    <label>Athletes Present Range
      <input 
        type="number" 
        name="athletesPresentStart" 
        value={athletesPresentStart} 
        onChange={(event) => setAthletesPresentStart(event.target.valueAsNumber)}
      />
      <input 
        type="number" 
        name="athletesPresentEnd" 
        value={athletesPresentEnd} 
        onChange={(event) => setAthletesPresentEnd(event.target.valueAsNumber)}
      />
    </label>
    <label>Athletes Needed Range
      <input 
        type="number" 
        name="athletesNeededStart" 
        value={athletesNeededStart} 
        onChange={(event) => setAthletesNeededStart(event.target.valueAsNumber)}
      />
      <input 
        type="number" 
        name="athletesNeededEnd" 
        value={athletesNeededEnd} 
        onChange={(event) => setAthletesNeededEnd(event.target.valueAsNumber)}
      />
    </label>
    <label>Date
      <input 
        type="date" 
        name="date" 
        value={date} 
        onChange={(event) => setDate(event.target.value)}
      />
    </label>
    <label>Start Time
      <input 
        type="time" 
        name="startTime" 
        value={startTime} 
        onChange={(event) => setStartTime(event.target.value)}
      />
    </label>
    <label>End Time
      <input 
        type="time" 
        name="endTime" 
        value={endTime} 
        onChange={(event) => setEndTime(event.target.value)}
      />
    </label>

    {viewport && (
      <Map
        minZoom={16}
        maxZoom={20}
        ref={mapRef}
        reuseMaps
        initialViewState={viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{width: 1000, height: 800}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={(e) => handleMapClick({
          "latitude": e.lngLat.lat, "longitude": e.lngLat.lng, "athletes_present": 0, 
          "athletes_needed": 0, "date": "","start_time": "", 
          "end_time": "null", "message": null})}>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {data && locationMarkers}
        {location && (
          <Popup longitude={location.longitude} latitude={location.latitude}
            key={`${location.longitude}${location.latitude}`}
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