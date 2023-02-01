import { useCallback } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

export default function useUpdateLocation(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<{ message: string }>,
  any
> {
  const queryClient = useQueryClient();

  const updateLocation = useCallback(
    (location: any): Promise<AxiosResponse<any>> => {
      return axios.put(`http://localhost:8000/api/locations/${location.location_id}/`, location);
    },
    [],
  );

  return useMutation(updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });
}