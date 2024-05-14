import { Helmet } from 'react-helmet-async';
// sections
import { AmenitiesListView } from 'src/sections/amenities/view';

// ----------------------------------------------------------------------

export default function AmenitiesListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property type List</title>
      </Helmet>

      <AmenitiesListView />
    </>
  );
}
