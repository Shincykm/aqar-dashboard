import { Helmet } from 'react-helmet-async';
// sections
import {PropertyTypeCreateView} from 'src/sections/property-type/view';

// ----------------------------------------------------------------------

export default function PropertyTypeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new property type</title>
      </Helmet>

      <PropertyTypeCreateView />
    </>
  );
}