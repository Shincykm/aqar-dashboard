import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axiosInstance1, { endpoints, fetcher1, performRequest } from 'src/utils/axios';
// types
import axios from 'axios';
import { createFormData } from 'src/utils/create-formData';

// ----------------------------------------------------------------------

export function useGetAgentList(page = 1, limit = 10, search = '') {
  const URL = `${endpoints.agents.list}?page=${page}&limit=${limit}&search=${search}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      agents: (data?.data as any[]) || [],
      agentsLoading: isLoading,
      agentsError: error,
      agentsValidating: isValidating,
      agentsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetAgent(agentId: string | number) {
  const URL = agentId ? `${endpoints.agents.details}/${agentId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher1);

  const memoizedValue = useMemo(
    () => ({
      agent: data?.data as any,
      agentLoading: isLoading,
      agentError: error,
      agentValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

const handleFormData = (data:any) => {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (key === "id" && value) {
        formData.append(key, value.toString());
      } else if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0');
      } else if (typeof value === 'string' && value !== '') {
        formData.append(key, value);
      } else if (typeof value === 'number' && value !== 0) {
        formData.append(key, value.toString());
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, JSON.stringify(item));
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      }
    });
  
    return formData;
  };

// ----------------------------------------------------------------------

export async function useCreateUpdateAgents(agentData: any) {
    const URL = endpoints.property.createUpdate;

    // Hnadling formData
    const formData = handleFormData(agentData);

    try {
        const response = await performRequest<any>('post', URL, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------

export async function useDeleteAgents(agentId: number) {
    const URL = endpoints.agents.delete;

    try {
      const response = await performRequest<any>('DELETE', `${URL}/${agentId}`);
      return response?.data;
    } catch (error) {
      throw error;
    }
}
