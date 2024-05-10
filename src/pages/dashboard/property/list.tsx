import { Helmet } from 'react-helmet-async';
// sections
import PropertyListView from 'src/sections/property/view/property-list-view';

// ----------------------------------------------------------------------

export default function PropertyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property List</title>
      </Helmet>

      {/* <ProductListView /> */}
      <PropertyListView />
    </>
  );
}

