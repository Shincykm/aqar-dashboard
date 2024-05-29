import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axiosInstance1, { endpoints, fetcher1, performRequest } from 'src/utils/axios';
// types
import { IAmenityItem } from 'src/types/amenities';
import axios from 'axios';

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

export function useGetAmenity(amenityId: string | number) {
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

  let config: any = {
    data: amenityData,
  };

  if (amenityData instanceof FormData) {
    config.headers = {
      'Accept': '*',
      'Content-Type': 'multipart/form-data',
    };
  }
  const response = await axios(`${import.meta.env.VITE_HOST_AQAR_API}${URL}`,{
    method : "POST",
    ...config
  });

  // let response;

  // if (amenityData instanceof FormData) {
  //   const config = {
  //     data: amenityData,
  //     headers: {
  //       Accept: '*',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };
  //   response = await performRequest('POST', URL,{
  //     data: amenityData,
  //     headers: {
  //       Accept: '*',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // }else{
  //   response = await performRequest('POST', URL, {data : amenityData});
  // }

  return response;
}

// ----------------------------------------------------------------------

export async function useDeleteAmenities(amenityId: number) {
  const URL = endpoints.amenities.delete;

  const response = await performRequest<any>('DELETE', `${URL}/${amenityId}`);
  return response;
}

// ----------------------------------------------------------------------
// Amenity-Picture mapping 



// ----------------------------------------------------------------------
// Amenity-Property mapping 


export async function useCreateUpdateAmenityPropertyMapping(amenityIds, propertyId:any) {
  const URL = endpoints.amenityProperty.createUpdate;

  console.log(amenityIds, typeof amenityIds);
  
  try {
    const formData = new FormData();
    formData.append('amenities', amenityIds);
    formData.append('property_id', propertyId);
    const response = await performRequest<any>('post', URL, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}