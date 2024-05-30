import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, performRequest, fetcher1 } from 'src/utils/axios';
// types
import { IPropertyItem } from 'src/types/property';
import { createFormData } from 'src/utils/create-formData';
// ----------------------------------------------------------------------

export function useGetProperties(page=1, limit=10) {
  const URL = `${endpoints.property.list}?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.data as IPropertyItem[]) || [],
      total: data?.total,
      countPerPage:data?.count_per_page,
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProperty(propertyId: string) {
  const URL = propertyId ? `${endpoints.property.details}/${propertyId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      property: (data?.data as IPropertyItem[]) || [],
      propertyLoading: isLoading,
      propertyError: error,
      propertyValidating: isValidating,
      propertyEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.property, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function useCreateUpdateProperty(propertyData: any) {
  const URL = endpoints.property.createUpdate;

  // Hnadling formData
  const formData = createFormData(propertyData);

  try {
    const response = await performRequest<any>('post', URL, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------------------------------------------------
// Delete property-picture mapping when removing file during edit

export async function useDeletePropertyPictureMapping(id: any) {
  const URL = endpoints.property.deletePicture;

  try {
    const response = await performRequest<any>('DELETE', `${URL}/${id}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
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

// ----------------------------------------------------------------------
