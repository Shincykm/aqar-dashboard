// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import AmenityNewEditForm from '../amenity-new-edit-form';

// ----------------------------------------------------------------------

export default function AmenityCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Amenity"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Amenity',
            href: paths.dashboard.amenities.root,
          },
          { name: 'New Amenity' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AmenityNewEditForm />
    </Container>
  );
}
