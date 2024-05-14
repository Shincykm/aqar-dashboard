import { Helmet } from 'react-helmet-async';
// sections
import { PropertyStyleListView } from 'src/sections/property-style/view';

// ----------------------------------------------------------------------

export default function PropertyTypeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property Style List</title>
      </Helmet>

      <PropertyStyleListView />
    </>
  );
}
