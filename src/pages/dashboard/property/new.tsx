import { Helmet } from 'react-helmet-async';
// sections
import { PropertyCreateView } from 'src/sections/property/view';

// ----------------------------------------------------------------------

export default function PropertyCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new property</title>
      </Helmet>

      <PropertyCreateView />
    </>
  );
}