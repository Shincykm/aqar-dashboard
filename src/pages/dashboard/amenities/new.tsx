import { Helmet } from 'react-helmet-async';
// sections
import {AmenitiesCreateView} from 'src/sections/amenities/view';

// ----------------------------------------------------------------------

export default function AmenitiesCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new amenities</title>
      </Helmet>

      <AmenitiesCreateView />
    </>
  );
}