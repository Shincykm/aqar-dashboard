import { useCallback, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// types
import PropertyItemNew from './property-item-new';
// components
import { usePathname, useRouter, useSearchParams } from 'src/routes/hooks';
//


// ----------------------------------------------------------------------

type Props = {
  properties : any;
  totalProperties : number;
  countPerPage : number;
};

export default function PropertyListNew({ properties, totalProperties , countPerPage, setPage, page, handleDelete }: any) {
  const router = useRouter();

  // pagination
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };

  const handlePagination = useCallback((e:any, value:any) => {
    setPage(value);
    e.target.value = page;
  }, []);

  useEffect(()=>{
    const url = createPageURL(page);
  }, [page]);

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

      {properties.length > 4 && (
          <Pagination
            count={Math.ceil(totalProperties/countPerPage)}
            onChange={handlePagination}
            page={page}
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
