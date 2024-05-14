// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetPropertyPurpose } from 'src/api/propertyPurpose';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyPurposeNewEditForm from 'src/sections/property-purpose/property-purpose-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: number | string;
};

export default function PropertyPurposeEditView({ id }: Props) {
  const settings = useSettingsContext();
  
  const { propertyPurposes: currentPropertyPurpose } = useGetPropertyPurpose(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Property Type',
            href: paths.dashboard.propertyPurpose.root,
          },
          { name: currentPropertyPurpose?.name_en },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyPurposeNewEditForm currentPropertyPurpose={currentPropertyPurpose} />
    </Container>
  );
}
