import { useCallback } from 'react';

import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import useAxiosClient from '../../axiosClient';
import { Location } from '../../types/Location';
import { UrlParameters } from '../../types/General';
import { createUrlParameters } from '../../utils/url';

interface IUseListLocationsProps {
  latitudeHigh: string | undefined;
  longitudeHigh: string | undefined;
  latitudeLow: string | undefined;
  longitudeLow: string | undefined;
  athletesNeededLow: string | undefined;
  athletesNeededHigh: string | undefined;
  athletesPresentLow: string | undefined;
  athletesPresentHigh: string | undefined;
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
      parameters.latitude_high = latitudeHigh;
    }
    if(!!longitudeHigh){
      parameters.longitude_high = longitudeHigh;
    }
    if(!!latitudeLow){
      parameters.latidude_low = latitudeLow;
    }
    if(!!longitudeLow){
      parameters.longitude_low = longitudeLow;
    }
    if(!!athletesNeededLow){
      parameters.athletes_needed_low = athletesNeededLow;
    }
    if(!!athletesNeededHigh){
      parameters.athletes_needed_high = athletesNeededHigh;
    }
    if(!!athletesPresentLow){
      parameters.athletes_present_low = athletesPresentLow;
    }
    if(!!athletesPresentHigh){
      parameters.athletes_present_high = athletesPresentHigh;
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