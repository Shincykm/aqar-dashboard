import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, fetcher1, performRequest } from 'src/utils/axios';

// ----------------------------------------------------------------------

// get COuntries

// ----------------------------------------------------------------------

export function useGetCountriesList(page = 1, limit=10 ) {
  const URL = `${endpoints.address.country}?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      countries: (data?.data as any[]) || [],
      countriesLoading: isLoading,
      countriesError: error,
      countriesValidating: isValidating,
      countriesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}