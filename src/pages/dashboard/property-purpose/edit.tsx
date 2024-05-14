import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
// section
import { PropertyPurposeEditView } from 'src/sections/property-purpose/view';

export default function  PropertyPurposeEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Property Purpose Edit</title>
      </Helmet>

      <PropertyPurposeEditView id={`${id}`} />
    </>
  );
};
