import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// types
import { IPropertyItem } from 'src/types/property';

// ----------------------------------------------------------------------

export function useGetProperties() {
  const URL = endpoints.property.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.property as IPropertyItem[]) || [],
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.property.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProperty(propertyId: string) {
  const URL = propertyId ? [endpoints.property.details, { params: { propertyId } }] : null;

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      property: data?.property as IPropertyItem,
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// export function useSearchProducts(query: string) {
//   const URL = query ? [endpoints.product.search, { params: { query } }] : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
//     keepPreviousData: true,
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       searchResults: (data?.results as IProductItem[]) || [],
//       searchLoading: isLoading,
//       searchError: error,
//       searchValidating: isValidating,
//       searchEmpty: !isLoading && !data?.results.length,
//     }),
//     [data?.results, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }
