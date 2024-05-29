// @mui
import Box, { BoxProps } from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { IPropertyItem } from 'src/types/property';
//
import PropertyItem from './property-item';
import { PropertyItemSkeleton } from './property-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  property: IPropertyItem[];
  loading?: boolean;
};

export default function ProductList({ property, loading, ...other }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <PropertyItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {property.map((property) => (
        <PropertyItem key={property.id} property={property} />
      ))}
    </>
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
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {property.length > 8 && (
        <Pagination
          count={8}
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
