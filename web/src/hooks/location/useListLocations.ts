import { useCallback } from 'react';

import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import useAxiosClient from '../../axiosClient';
import { Location } from '../../types/Location';
import { UrlParameters } from '../../types/General';
import { createUrlParameters } from '../../utils/url';

interface IUseListLocationsProps {
  latitudeHigh: number | undefined;
  longitudeHigh: number | undefined;
  latitudeLow: number | undefined;
  longitudeLow: number | undefined;
  athletesNeededLow: number | undefined;
  athletesNeededHigh: number | undefined;
  athletesPresentLow: number | undefined;
  athletesPresentHigh: number | undefined;
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  enabled: boolean;
}

function useListLocations({
  latitudeHigh,
  longitudeHigh,
  latitudeLow,
  longitudeLow,
  athletesNeededLow,
  athletesNeededHigh,
  athletesPresentLow,
  athletesPresentHigh,
  date,
  startTime,
  endTime,
  enabled,
}: IUseListLocationsProps): UseQueryResult<AxiosResponse<Location[]>> {
  const axiosClient = useAxiosClient()
  const fetchLocations = useCallback((): Promise<AxiosResponse<Location[]>> => {
    const parameters = {} as UrlParameters;
    if(!!latitudeHigh){
      parameters.latitude_high = latitudeHigh.toString();
    }
    if(!!longitudeHigh){
      parameters.longitude_high = longitudeHigh.toString();
    }
    if(!!latitudeLow){
      parameters.latidude_low = latitudeLow.toString();
    }
    if(!!longitudeLow){
      parameters.longitude_low = longitudeLow.toString();
    }
    if(!!athletesNeededLow){
      parameters.athletes_needed_low = athletesNeededLow.toString();
    }
    if(!!athletesNeededHigh){
      parameters.athletes_needed_high = athletesNeededHigh.toString();
    }
    if(!!athletesPresentLow){
      parameters.athletes_present_low = athletesPresentLow.toString();
    }
    if(!!athletesPresentHigh){
      parameters.athletes_present_high = athletesPresentHigh.toString();
    }
    if(!!date){
      parameters.date = date;
    }
    if(!!startTime){
      parameters.start_time = startTime;
    }
    if(!!endTime){
      parameters.end_time = endTime;
    }

    return axiosClient.get(`locations/?${createUrlParameters(parameters)}`);
  }, [athletesNeededHigh, athletesNeededLow, athletesPresentHigh, athletesPresentLow, axiosClient, date, endTime, latitudeHigh, longitudeHigh, startTime, latitudeLow, longitudeLow]);
  return useQuery([`locations`, athletesNeededHigh, athletesNeededLow, athletesPresentHigh, athletesPresentLow, date, endTime, latitudeHigh, longitudeHigh, startTime, latitudeLow, longitudeLow], fetchLocations, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled,
  });
}

export default useListLocations;