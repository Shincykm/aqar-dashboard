import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, fetcher1, performRequest } from 'src/utils/axios';
// types
import { IPropertyStyleItem } from 'src/types/propertyStyle';

// ----------------------------------------------------------------------

export function useGetPropertyStyleList(page = 1, limit=10 ) {
  const URL = `${endpoints.propertyStyle.list}?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      propertyStyles: (data?.data as IPropertyStyleItem[]) || [],
      propertyStyleLoading: isLoading,
      propertyStyleError: error,
      propertyStyleValidating: isValidating,
      propertyStyleEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPropertyStyle(propertyStyleId: string | number) {
  const URL = propertyStyleId ? `${endpoints.propertyStyle.details}/${propertyStyleId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      propertyStyles: data?.data as IPropertyStyleItem,
      propertyStyleLoading: isLoading,
      propertyStyleError: error,
      propertyStyleValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdatePropertyStyle(propertyStyleData : any){
  const URL = endpoints.propertyStyle.createUpdate;

  const response = await performRequest('POST', URL ,{data : propertyStyleData});
  return response;
}

// ----------------------------------------------------------------------

export async function useDeletePropertyStyle(propertyStyleId : number){
  const URL = endpoints.propertyStyle.delete;

  const response = await performRequest<any>('DELETE',`${URL}/${propertyStyleId}`);
  return response;
}