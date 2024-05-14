import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { AmenitiesEditView } from 'src/sections/amenities/view';

export default function  AmenitiesEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Amenities Edit</title>
      </Helmet>

      <AmenitiesEditView id={`${id}`} />
    </>
  );
};
