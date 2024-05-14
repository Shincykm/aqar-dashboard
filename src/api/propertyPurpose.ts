import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, fetcher1, performRequest } from 'src/utils/axios';
// types
import { IPropertyPurposeItem } from 'src/types/propertyPurpose';

// ----------------------------------------------------------------------

export function useGetPropertyPurposeList(page = 1, limit=10 ) {
  const URL = `${endpoints.propertyPurpose.list}?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      propertyPurposes: (data?.data as IPropertyPurposeItem[]) || [],
      propertyPurposeLoading: isLoading,
      propertyPurposeError: error,
      propertyPurposeValidating: isValidating,
      propertyPurposeEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPropertyPurpose(propertyPurposeId: string | number) {
  const URL = propertyPurposeId ? `${endpoints.propertyPurpose.details}/${propertyPurposeId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      propertyPurposes: data?.data as IPropertyPurposeItem,
      propertyPurposeLoading: isLoading,
      propertyPurposeError: error,
      propertyPurposeValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdatePropertyPurpose(propertyPurposeData : any){
  const URL = endpoints.propertyPurpose.createUpdate;

  const response = await performRequest('POST', URL ,{data : propertyPurposeData});
  return response;
}

// ----------------------------------------------------------------------

export async function useDeletePropertyPurpose(propertyPurposeId : number){
  const URL = endpoints.propertyPurpose.delete;

  const response = await performRequest<any>('DELETE',`${URL}/${propertyPurposeId}`);
  return response;
}