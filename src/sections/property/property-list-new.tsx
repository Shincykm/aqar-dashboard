import { useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// types
import { ITourItem } from 'src/types/tour';
// components
import { useRouter } from 'src/routes/hooks';
//
import TourItem from '../tour/tour-item';
import PropertyItemNew from './property-item-new';
import { count } from 'console';
import { RHFSelect } from 'src/components/hook-form';
import { FormControl } from '@mui/base';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useDeleteProperty } from 'src/api/property';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

type Props = {
  properties : any;
  totalProperties : any;
  countPerPage : any;
};

export default function PropertyListNew({ properties, totalProperties , countPerPage, page, handleDelete, handlePagination, handlePageItemLimit, pageLimit }: any) {
  const router = useRouter();

  // const handleView = useCallback(
  //   (id: string) => {
  //     router.push(paths.dashboard.property.details(id));
  //   },
  //   [router]
  // );
  
  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.property.edit(id));
    },
    [router]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {properties.map((property:any,index:any) => (
          <PropertyItemNew
            key={index}
            property={property}
            // onView={() => handleView(property.id)}
            onEdit={() => handleEdit(property.id)}
            onDelete={() => handleDelete(property.id)}
          />
        ))}
      </Box>

          {/* <FormControl>
            <InputLabel id="demo-simple-select-label">Items Per Page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageLimit}
              label="Age"
              onChange={handlePageItemLimit}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl> */}

          {properties.length > 4 && (
              <Pagination
                count={Math.ceil(totalProperties/countPerPage)}
                onChange={handlePagination}
                value = {page}
                sx={{
                  mt: 8,
                  [`& .${paginationClasses.ul}`]: {
                    justifyContent: 'center',
                  },
                }}
              />
            )}
      
    </>
  );
}
