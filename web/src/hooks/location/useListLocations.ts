import { useCallback } from 'react';

import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

interface IUseListLocationsProps {
  neLatitude: number | null;
  neLongitude: number | null;
  swLatidude: number | null;
  swLongitude: number | null;
  enabled: boolean;
}

function useListLocations({
  neLatitude,
  neLongitude,
  swLatidude,
  swLongitude,
  enabled,
}: IUseListLocationsProps): UseQueryResult<AxiosResponse<any>> {
  const fetchLocations = useCallback((): Promise<AxiosResponse<any>> => {
    return axios.get(
      `http://localhost:8000/api/locations/?neLatitude=${neLatitude}&neLongitude=${neLongitude}&swLatidude=${swLatidude}&swLongitude=${swLongitude}`,
    );
  }, [neLatitude, neLongitude, swLatidude, swLongitude]);
  return useQuery([`listLocations`, neLatitude, neLongitude, swLatidude, swLongitude], fetchLocations, {
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled,
  });
}

export default useListLocations;