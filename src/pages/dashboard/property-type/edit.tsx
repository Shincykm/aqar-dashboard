import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import PropertyEditView from 'src/sections/property/view/property-edit-view';

export default function  PropertyTypeEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Property type Edit</title>
      </Helmet>

      {/* <PropertyEditView id={`${id}`} /> */}
    </>
  );
};
