import { Helmet } from 'react-helmet-async';
// sections
import { PropertyPurposeCreateView } from 'src/sections/property-purpose/view';

// ----------------------------------------------------------------------

export default function PropertyPurposeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new property purpose</title>
      </Helmet>

      <PropertyPurposeCreateView />
    </>
  );
}
