import { useCallback } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

export default function useDeleteLocation(): UseMutationResult<
  AxiosResponse<null>,
  AxiosError<{ message: string }>,
  string
> {
  const queryClient = useQueryClient();

  const deleteLocation = useCallback(
    (location_id: string): Promise<AxiosResponse<null>> => {
      return axios.delete(`http://localhost:8000/api/locations/${location_id}/`);
    },
    [],
  );

  return useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });
}