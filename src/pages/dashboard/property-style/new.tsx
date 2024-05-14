import { Helmet } from 'react-helmet-async';
// sections
import { PropertyStyleCreateView } from 'src/sections/property-style/view';

// ----------------------------------------------------------------------

export default function PropertyStyleCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new property style</title>
      </Helmet>

      <PropertyStyleCreateView />
    </>
  );
}
