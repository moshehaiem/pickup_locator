import { useCallback } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import useAxiosClient from '../../axiosClient';

export default function useUpdateLocation(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<{ message: string }>,
  any
> {
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient()

  const updateLocation = useCallback(
    (location: any): Promise<AxiosResponse<any>> => {
      return axiosClient.put(`locations/${location.location_id}/`, location);
    },
    [axiosClient],
  );

  return useMutation(updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });
}