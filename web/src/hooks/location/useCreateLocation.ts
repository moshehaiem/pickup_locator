import { useCallback } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import useAxiosClient from '../../axiosClient';
import { CreateOrUpdateLocation } from '../../types/CreateOrUpdateLocation';
import { Location } from '../../types/Location';

export default function useCreateLocation(): UseMutationResult<
  AxiosResponse<Location>,
  AxiosError<{ message: string }>,
  CreateOrUpdateLocation
> {
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient();

  const createLocation = useCallback(
    (location: CreateOrUpdateLocation): Promise<AxiosResponse<Location>> => {
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