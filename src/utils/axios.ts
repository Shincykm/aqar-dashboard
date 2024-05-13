import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';
import { HOST_AQAR_API } from 'src/config-global';

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

// ----------------------------------------------------------------------
const axiosInstance1 = axios.create({ baseURL: HOST_AQAR_API });

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

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const fetcher1 = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance1.get(url, { ...config });

  return res.data;
};

export const poster = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance1.post(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

// const ovadAxiosInstanace = axios.create({
//   baseURL: HOST_API,
//   headers: {
//     Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
//   },
// });
// export const creatorFunction = async (args: string | [string, AxiosRequestConfig]) => {
//   const [url, config] = Array.isArray(args) ? args : [args];
//   const res = await ovadAxiosInstanace.post(url, config);
//   return res.data;
// };

// export function SetDefaulComb(body: any) {
//   const URL = endpoints.attribute.setDefault;
//   const response = creatorFunction([URL, body]);
//   return response;
// }

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
  },
};
