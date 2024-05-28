// import React, { useState, useEffect } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import { TextField } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';
// import { debounce } from 'lodash';
// import axios from 'axios';
// import axiosInstance1 from 'src/utils/axios';

// // Define the prop types for the RHFAsyncAutoComplete component
// interface RHFAsyncAutoCompleteProps {
//   name: string;
//   label?: string;
//   fetchUrl: string;
//   debounceTime?: number;
//   getOptionLabel: (option: any) => string;
// }

// const RHFAsyncAutoComplete: React.FC<RHFAsyncAutoCompleteProps> = ({
//   name,
//   label,
//   fetchUrl,
//   debounceTime = 300,
//   getOptionLabel,
// }) => {
//   const { control } = useFormContext();
//   const [open, setOpen] = useState(false);
//   const [options, setOptions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [fetchedOptions, setFetchedOptions] = useState(new Set());

//   const fetchOptions = debounce(async (searchTerm: string, nextPage: number) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance1.get(fetchUrl, {
//         params: { search: searchTerm, page: nextPage },
//       });
//       const newOptions = response.data?.data;
//       setOptions((prevOptions: any[]) => {
//         const filteredOptions = newOptions.filter(
//           (newOption: any) => !prevOptions.some((prevOption) => prevOption.id === newOption.id)
//         );
//         return [...prevOptions, ...filteredOptions];
//       });
//       setHasMore(newOptions.length > 0);
//     } catch (error) {
//       console.error('Error fetching options:', error);
//       setOptions([]);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   }, debounceTime);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = event.target.value;
//     setPage(1); // Reset page when input changes
//     setOptions([]); // Clear existing options
//     fetchOptions(searchTerm, 1); // Fetch options for the first page
//   };

//   const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
//     const target = event.target as HTMLDivElement;
//     if (target.scrollHeight - target.scrollTop === target.clientHeight && hasMore) {
//       // User has scrolled to the bottom
//       fetchOptions('', page + 1); // Fetch next page of options
//       setPage((prevPage) => prevPage + 1); // Increment page number
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <Autocomplete
//           {...field}
//           freeSolo
//           disableClearable
//           fullWidth
//           open={open}
//           onOpen={() => setOpen(true)}
//           onClose={() => setOpen(false)}
//           options={options}
//           loading={loading}
//           loadingText="Loading..."
//           getOptionLabel={getOptionLabel} // Use the provided getOptionLabel function
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={label}
//               variant="outlined"
//               onChange={handleInputChange}
//               InputProps={{
//                 ...params.InputProps,
//                 endAdornment: (
//                   <>
//                     {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                     {params.InputProps.endAdornment}
//                   </>
//                 ),
//               }}
//             />
//           )}
//         />
//       )}
//     />
//   );
// };

// export default RHFAsyncAutoComplete;



import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';
import axiosInstance1 from 'src/utils/axios';

interface RHFAsyncAutoCompleteProps {
  name: string;
  label?: string;
  fetchUrl: string;
  debounceTime?: number;
  getOptionLabel: (option: any) => string;
  getOptionSelected: (option: any, value: any) => boolean;
}

const RHFAsyncAutoComplete: React.FC<RHFAsyncAutoCompleteProps> = ({
  name,
  label,
  fetchUrl,
  debounceTime = 300,
  getOptionLabel,
  getOptionSelected,
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchOptions = debounce(async (searchTerm: string, nextPage: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance1.get(fetchUrl, {
        params: { search: searchTerm, page: nextPage },
      });
      const newOptions = response.data?.data;
      let optionsLabels=newOptions.map((e:any)=>({
        name:e.name,
        label:e.name,
        id:e.id
      }))
      setOptions((prevOptions: any[]) => {
        const filteredOptions = optionsLabels.filter(
          (newOption: any) => !prevOptions.some((prevOption) => prevOption.id === newOption.id)
        );
        return [...prevOptions, ...filteredOptions];
      });
      setHasMore(optionsLabels.length > 0);
    } catch (error) {
      console.error('Error fetching options:', error);
      setOptions([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, debounceTime);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setPage(1); // Reset page when input changes
    setOptions([]); // Clear existing options
    fetchOptions(searchTerm, 1); // Fetch options for the first page
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight && hasMore) {
      // User has scrolled to the bottom
      fetchOptions('', page + 1); // Fetch next page of options
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          freeSolo
          disableClearable
          fullWidth
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          options={options}
          loading={loading}

          loadingText="Loading..."
          getOptionLabel={getOptionLabel} 
          // getOptionSelected={getOptionSelected} 
          renderInput={(params) => (
            <TextField
              {...params}
              label={label }
              variant="outlined"
              onChange={handleInputChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          // onChange={(event, value) => {
          //   console.log(value.id)
          //   if (value) {
          //     field.onChange(JSON.stringify(value)); // Return selected value as JSON string
          //   }
          // }}
        />
      )}
    />
  );
};

export default RHFAsyncAutoComplete;
