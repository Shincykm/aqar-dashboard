import { Helmet } from 'react-helmet-async';
// sections
import PropertyListViewNew from 'src/sections/property/view/property-list-view-new';

// ----------------------------------------------------------------------

export default function PropertyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property List</title>
      </Helmet>

      <PropertyListViewNew />
    </>
  );
}

