import { useCallback } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import useAxiosClient from '../../axiosClient';

export default function useCreateLocation(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<{ message: string }>,
  any
> {
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient();

  const createLocation = useCallback(
    (location: any): Promise<AxiosResponse<any>> => {
      return axiosClient.post('locations/', location);
    },
    [axiosClient],
  );
  return useMutation(createLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });
}