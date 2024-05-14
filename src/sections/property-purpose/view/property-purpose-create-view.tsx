// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyPurposeNewEditForm from '../property-purpose-new-edit-form';

// ----------------------------------------------------------------------

export default function PropertyPurposeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new property purpose"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Property Purpose',
            href: paths.dashboard.propertyType.root,
          },
          { name: 'New property purpose' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyPurposeNewEditForm />
    </Container>
  );
}
