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
  athletesNeededStart: string | null;
  athletesNeededEnd: string | null;
  athletesPresentStart: string | null;
  athletesPresentEnd: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
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
    if(neLatitude){
      parameters.neLatitude = neLatitude;
    }
    if(neLongitude){
      parameters.neLongitude = neLongitude;
    }
    if(swLatidude){
      parameters.swLatidude = swLatidude;
    }
    if(swLongitude){
      parameters.swLongitude = swLongitude;
    }
    if(athletesNeededStart){
      parameters.athletesNeededStart = athletesNeededStart;
    }
    if(athletesNeededEnd){
      parameters.athletesNeededEnd = athletesNeededEnd;
    }
    if(athletesPresentStart){
      parameters.athletesPresentStart = athletesPresentStart;
    }
    if(athletesPresentEnd){
      parameters.athletesPresentEnd = athletesPresentEnd;
    }
    if(date){
      parameters.date = date;
    }
    if(startTime){
      parameters.startTime = startTime;
    }
    if(endTime){
      parameters.endTime = endTime;
    }

    return axiosClient.get(`locations/?${createUrlParameters(parameters)}`);
  }, [athletesNeededEnd, athletesNeededStart, athletesPresentEnd, athletesPresentStart, axiosClient, date, endTime, neLatitude, neLongitude, startTime, swLatidude, swLongitude]);
  return useQuery([`listLocations`, athletesNeededEnd, athletesNeededStart, athletesPresentEnd, athletesPresentStart, date, endTime, neLatitude, neLongitude, startTime, swLatidude, swLongitude], fetchLocations, {
    enabled,
  });
}

export default useListLocations;