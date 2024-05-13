// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyTypeNewEditForm from '../property-type-new-edit-form';

// ----------------------------------------------------------------------

export default function PropertyTypeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new property type"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Property Type',
            href: paths.dashboard.propertyType.root,
          },
          { name: 'New property type' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyTypeNewEditForm />
    </Container>
  );
}
