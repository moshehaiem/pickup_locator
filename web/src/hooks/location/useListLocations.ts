import { useCallback } from 'react';

import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import useAxiosClient from '../../axiosClient';

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
  const axiosClient = useAxiosClient()
  const fetchLocations = useCallback((): Promise<AxiosResponse<any>> => {
    return axiosClient.get(
      `locations/?neLatitude=${neLatitude}&neLongitude=${neLongitude}&swLatidude=${swLatidude}&swLongitude=${swLongitude}`,
    );
  }, [axiosClient, neLatitude, neLongitude, swLatidude, swLongitude]);
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