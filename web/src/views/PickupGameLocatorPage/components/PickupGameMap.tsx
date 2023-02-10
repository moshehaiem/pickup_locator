import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const [location, setLocation] = useState<CreateOrUpdateLocation | null>(null);
  const [viewport, setViewport] = useState<IViewPortType | null>(null);
  const [latitudeHigh, setLatitudeHigh] = useState<number | null>(null);
  const [longitudeHigh, setLongitudeHigh] = useState<number | null>(null);
  const [latitudeLow, setLatitudeLow] = useState<number | null>(null);
  const [longitudeLow, setLongitudeLow] = useState<number | null>(null);
  const [athletesNeededLow, setAthletesNeededLow] = useState<number | undefined>(1);
  const [athletesPresentLow, setAthletesPresentLow] = useState<number | undefined>(1);
  const [athletesNeededHigh, setAthletesNeededHigh] = useState<number | undefined>(10);
  const [athletesPresentHigh, setAthletesPresentHigh] = useState<number | undefined>(10);
  const [date, setDate] = useState<string | undefined>(today);
  const [startTime, setStartTime] = useState<string | undefined>("00:00");
  const [endTime, setEndTime] = useState<string | undefined>("23:59");

  const { data: locations } = useListLocations({
    latitudeHigh: !!latitudeHigh ? latitudeHigh.toString() : undefined,
    longitudeHigh: !!longitudeHigh ? longitudeHigh.toString() : undefined,
    latitudeLow: !!latitudeLow ? latitudeLow.toString() : undefined,
    longitudeLow: !!longitudeLow ? longitudeLow.toString() : undefined,
    athletesNeededLow: !!athletesNeededLow ? athletesNeededLow.toString() : undefined,
    athletesNeededHigh: !!athletesNeededHigh ? athletesNeededHigh.toString() : undefined,
    athletesPresentLow: !!athletesPresentLow ? athletesPresentLow.toString() : undefined,
    athletesPresentHigh: !!athletesPresentHigh ? athletesPresentHigh.toString() : undefined,
    date,
    startTime,
    endTime,
    enabled: !!latitudeHigh && !!longitudeHigh && !!latitudeLow && !!longitudeLow
  });

  const flyToClickedPoint = useCallback((lng: number, lat: number): void => {
    if(mapRef){
      mapRef.flyTo({
        center: [lng, lat],
        zoom: 18
      });
    }
  }, [mapRef]);

  const handleMapRef = useCallback((ref: MapRef | null): void => {
    console.log('creating ref');
    setMapRef(ref);
    // if(ref){
    //   setLatitudeHigh(Math.ceil(ref.getBounds().getNorthEast().lat));
    //   setLongitudeHigh(Math.ceil(ref.getBounds().getNorthEast().lng));
    //   setLatitudeLow(Math.ceil(ref.getBounds().getSouthWest().lat));
    //   setLongitudeLow(Math.ceil(ref.getBounds().getSouthWest().lng));
    // }
}, []);

  const handleMapClick = useCallback((loc: CreateOrUpdateLocation): void => {
      flyToClickedPoint(loc.longitude, loc.latitude);
      setLocation(loc);
  }, [flyToClickedPoint]);

  const handleMapMove = useCallback((e: any): void => {
    const latitude = e.viewState.latitude;
    const longitude = e.viewState.longitude;
    setLatitudeHigh(Math.ceil(latitude));
    setLatitudeLow(Math.floor(latitude));
    setLongitudeHigh(Math.ceil(longitude));
    setLongitudeLow(Math.floor(longitude));
}, []);

  const locationMarkers = useMemo(
    () =>
    locations?.data.map((loc: Location, index: number) => (
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
    [locations, handleMapClick]
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
    <div>
      <label>Athletes Present Range
        <input 
          type="number" 
          name="athletesPresentLow" 
          value={athletesPresentLow} 
          onChange={(event) => {setAthletesPresentLow(event.target.valueAsNumber)}}
        />
        <input 
          type="number" 
          name="athletesPresentHigh" 
          value={athletesPresentHigh} 
          onChange={(event) => setAthletesPresentHigh(event.target.valueAsNumber)}
        />
      </label>
      <br />
      <label>Athletes Needed Range
        <input 
          type="number" 
          name="athletesNeededLow" 
          value={athletesNeededLow} 
          onChange={(event) => setAthletesNeededLow(event.target.valueAsNumber)}
        />
        <input 
          type="number" 
          name="athletesNeededHigh" 
          value={athletesNeededHigh} 
          onChange={(event) => setAthletesNeededHigh(event.target.valueAsNumber)}
        />
      </label>
      <br />
      <label>Date
        <input 
          type="date" 
          name="date" 
          value={date} 
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <br />
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
    </div>
    )
    }

    {viewport && (
      <Map
        minZoom={16}
        maxZoom={20}
        ref={ref => handleMapRef(ref)}
        reuseMaps
        initialViewState={viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{width: 1000, height: 800}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMoveEnd={handleMapMove}
        onClick={(e) => handleMapClick({
          "latitude": e.lngLat.lat, "longitude": e.lngLat.lng, "athletes_present": 0, 
          "athletes_needed": 0, "date": "","start_time": "", 
          "end_time": "null", "message": null})}>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {locations && locationMarkers}
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