import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
//
import { PropertyTypeEditView } from 'src/sections/property-type/view';

export default function  PropertyTypeEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Property type Edit</title>
      </Helmet>

      <PropertyTypeEditView id={`${id}`} />
    </>
  );
};
