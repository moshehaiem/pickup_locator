import { useCallback } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient, UseMutationResult } from 'react-query';

export default function useCreateLocation(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<{ message: string }>,
  any
> {
  const queryClient = useQueryClient();

  const createLocation = useCallback(
    (location: any): Promise<AxiosResponse<any>> => {
      return axios.post('http://localhost:8000/api/locations/', location);
    },
    [],
  );
  return useMutation(createLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });
}