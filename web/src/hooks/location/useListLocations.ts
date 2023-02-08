import { useCallback } from 'react';

import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import useAxiosClient from '../../axiosClient';
import { Location } from '../../types/Location';
import { UrlParameters } from '../../types/General';
import { createUrlParameters } from '../../utils/url';

interface IUseListLocationsProps {
  neLatitude: string | null;
  neLongitude: string | null;
  swLatidude: string | null;
  swLongitude: string | null;
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
  neLatitude,
  neLongitude,
  swLatidude,
  swLongitude,
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
    if(!!neLatitude){
      parameters.ne_latitude = neLatitude;
    }
    if(!!neLongitude){
      parameters.ne_longitude = neLongitude;
    }
    if(!!swLatidude){
      parameters.sw_latidude = swLatidude;
    }
    if(!!swLongitude){
      parameters.sw_longitude = swLongitude;
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
  }, [athletesNeededHigh, athletesNeededLow, athletesPresentHigh, athletesPresentLow, axiosClient, date, endTime, neLatitude, neLongitude, startTime, swLatidude, swLongitude]);
  return useQuery([`locations`, athletesNeededHigh, athletesNeededLow, athletesPresentHigh, athletesPresentLow, date, endTime, neLatitude, neLongitude, startTime, swLatidude, swLongitude], fetchLocations, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled,
  });
}

export default useListLocations;