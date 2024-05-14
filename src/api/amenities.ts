import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, fetcher1, performRequest } from 'src/utils/axios';
// types
import { IAmenityItem } from 'src/types/amenities';

// ----------------------------------------------------------------------

export function useGetAmenitiesList(page = 1, limit = 10, search = '') {
  const URL = `${endpoints.amenities.list}?page=${page}&limit=${limit}&search=${search}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      amenities: (data?.data as IAmenityItem[]) || [],
      amenitiesLoading: isLoading,
      amenitiesError: error,
      amenitiesValidating: isValidating,
      amenitiesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetAmenities(amenityId: string | number) {
  const URL = amenityId ? `${endpoints.amenities.details}/${amenityId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      amenities: data?.data as IAmenityItem,
      amenitiesLoading: isLoading,
      amenitiesError: error,
      amenitiesValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdateAmenities(amenityData: any) {
  const URL = endpoints.amenities.createUpdate;

  const response = await performRequest('POST', URL, {
    data: amenityData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

// ----------------------------------------------------------------------

export async function useDeleteAmenities(amenityId: number) {
  const URL = endpoints.amenities.delete;

  const response = await performRequest<any>('DELETE', `${URL}/${amenityId}`);
  return response;
}
