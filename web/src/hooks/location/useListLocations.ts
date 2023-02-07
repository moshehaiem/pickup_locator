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
  athletesNeededStart: string | undefined;
  athletesNeededEnd: string | undefined;
  athletesPresentStart: string | undefined;
  athletesPresentEnd: string | undefined;
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
  athletesNeededStart,
  athletesNeededEnd,
  athletesPresentStart,
  athletesPresentEnd,
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
    if(!!athletesNeededStart){
      parameters.athletes_needed_start = athletesNeededStart;
    }
    if(!!athletesNeededEnd){
      parameters.athletes_needed_end = athletesNeededEnd;
    }
    if(!!athletesPresentStart){
      parameters.athletes_present_start = athletesPresentStart;
    }
    if(!!athletesPresentEnd){
      parameters.athletes_present_end = athletesPresentEnd;
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
  }, [athletesNeededEnd, athletesNeededStart, athletesPresentEnd, athletesPresentStart, axiosClient, date, endTime, neLatitude, neLongitude, startTime, swLatidude, swLongitude]);
  return useQuery([`listLocations`, athletesNeededEnd, athletesNeededStart, athletesPresentEnd, athletesPresentStart, date, endTime, neLatitude, neLongitude, startTime, swLatidude, swLongitude], fetchLocations, {
    enabled,
  });
}

export default useListLocations;