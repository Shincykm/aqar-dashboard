import { Helmet } from 'react-helmet-async';
// sections
import { PropertyPurposeListView } from 'src/sections/property-purpose/view';


// ----------------------------------------------------------------------

export default function PropertyPurposeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property Purpose List</title>
      </Helmet>

      <PropertyPurposeListView />
    </>
  );
}
