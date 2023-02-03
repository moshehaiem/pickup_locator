import { useCallback } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import useAxiosClient from '../../axiosClient';

export default function useDeleteLocation(): UseMutationResult<
  AxiosResponse<null>,
  AxiosError<{ message: string }>,
  string
> {
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient();

  const deleteLocation = useCallback(
    (location_id: string): Promise<AxiosResponse<null>> => {
      return axiosClient.delete(`locations/${location_id}/`);
    },
    [axiosClient],
  );

  return useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });
}