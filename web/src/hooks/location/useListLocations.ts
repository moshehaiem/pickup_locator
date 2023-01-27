import { useCallback } from 'react';

import axios, { AxiosResponse } from 'axios';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { encodeUrlParams, getUrlParams } from '../../utils/url';
import { UrlParams } from '../../types/url-types';

interface QueryKeyType {
  pageParam?: UrlParams;
  queryKey: (string | undefined)[];
}

function useListLocations(): UseInfiniteQueryResult<AxiosResponse<any>> {

  const fetchLocations = useCallback(
    ({
      pageParam = { limit: '20', offset: '0' },
    }: QueryKeyType): Promise<AxiosResponse<any>> => {
      const params = pageParam;

      return axios.get(`locations/?${encodeUrlParams(params)}`);
    },
    [],
  );

  return useInfiniteQuery(['locations'], fetchLocations, {
    getNextPageParam: page => {
      return page.data.next ? getUrlParams(page.data.next) : undefined;
    },
  });
}

export default useListLocations;