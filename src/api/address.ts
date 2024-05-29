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

// ----------------------------------------------------------------------

export function useStateProvincesList(page = 1, limit=10, countryId="" ) {
  const URL = countryId ? `${endpoints.address.state}?page=${page}&limit=${limit}&country_id=${countryId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      stateProvinces: (data?.data as any[]) || [],
      stateProvincesLoading: isLoading,
      stateProvincesError: error,
      stateProvincesValidating: isValidating,
      stateProvincesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useCityList(page = 1, limit=10, stateId="" ) {
  const URL = stateId ? `${endpoints.address.city}?page=${page}&limit=${limit}&state_province_id=${stateId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      cities: (data?.data as any[]) || [],
      citiesLoading: isLoading,
      citiesError: error,
      citiesValidating: isValidating,
      citiesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

