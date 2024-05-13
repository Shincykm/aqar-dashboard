import { Helmet } from 'react-helmet-async';
// sections
import { PropertyTypeListView } from 'src/sections/property-type/view';

// ----------------------------------------------------------------------

export default function PropertyTypeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property type List</title>
      </Helmet>

      <PropertyTypeListView />
    </>
  );
}
