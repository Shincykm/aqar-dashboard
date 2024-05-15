import axios, { AxiosRequestConfig, Method } from 'axios';
// config
import { HOST_API } from 'src/config-global';
import { HOST_AQAR_API } from 'src/config-global';

// ----------------------------------------------------------------------
//  Replace when login is completed with axiosInstance1 with HOst_aqar_api
// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: HOST_API });

// Add an interceptor to attach the token and data to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Fetch the token from wherever it's stored (localStorage, sessionStorage, etc.)
    const token = localStorage.getItem('token');

    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add your data to the request body
    if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
      // Here, you can add your data to the request body
      // For example, assuming you have a globally accessible object `postData`
      // You can attach it to the `data` property of the config object
      config.data = {
        ...config.data,
        // Your data goes here
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};


// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
export const axiosInstance1 = axios.create({ baseURL: HOST_AQAR_API });

// Add an interceptor to attach the token and data to outgoing requests
axiosInstance1.interceptors.request.use(
  (config) => {
    // Fetch the token from wherever it's stored (localStorage, sessionStorage, etc.)
    const token = localStorage.getItem('token');

    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add your data to the request body
    if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
      // config.url = `${config.baseURL}${config.url}`;
      config.data = {
        ...config.data,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------

export const fetcher1 = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance1.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const performRequest = async <T>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await axiosInstance1.request<T>({
      method,
      url,
      ...config,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to make ${method} request to ${url}: ${error.message}`);
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  property: {
    list: '/api/property/list',
    details: '/api/property/details',
    search: '/api/property/search',
    createUpdate: '/api/admin/property/createUpdateProperty',
  },
  propertyType: {
    list: '/api/admin/propertyType/getPropertyTypeList',
    // search: '/api/property-type/search',
    createUpdate: '/api/admin/propertyType/createUpdatePropertyType',
    delete: '/api/admin/propertyType/deletePropertyType',
    details: '/api/admin/propertyType/getPropertyTypeById',
  },
  propertyStyle: {
    list: '/api/admin/propertyStyle/getPropertyStyleList',
    createUpdate: '/api/admin/propertyStyle/createUpdatePropertyStyle',
    delete: '/api/admin/propertyStyle/deletePropertyStyle',
    details: '/api/admin/propertyStyle/getPropertyStyleById',
  },
  propertyPurpose: {
    list: '/api/admin/propertyPurpose/getPropertyPurposeList',
    createUpdate: '/api/admin/propertyPurpose/createUpdatePropertyPurpose',
    delete: '/api/admin/propertyPurpose/deletePropertyPurpose',
    details: '/api/admin/propertyPurpose/getPropertyPurposeById',
  },
  amenities: {
    list: '/api/admin/amenities/getListAmenities',
    createUpdate: '/api/admin/amenities/createUpdateAmenities',
    delete: '/api/admin/amenities/deleteAmenity',
    details: '/api/admin//amenities/getAmenityById',
  },
};
