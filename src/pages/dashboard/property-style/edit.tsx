import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { PropertyStyleEditView } from 'src/sections/property-style/view';

export default function  PropertyTypeEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Property type Edit</title>
      </Helmet>

      <PropertyStyleEditView id={`${id}`} />
    </>
  );
};
