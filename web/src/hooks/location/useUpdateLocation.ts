import { useCallback } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import useAxiosClient from '../../axiosClient';
import { CreateOrUpdateLocation } from '../../types/CreateOrUpdateLocation';
import { Location } from '../../types/Location';

export default function useUpdateLocation(): UseMutationResult<
  AxiosResponse<Location>,
  AxiosError<{ message: string }>,
  CreateOrUpdateLocation
> {
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient()

  const updateLocation = useCallback(
    (location: CreateOrUpdateLocation): Promise<AxiosResponse<Location>> => {
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