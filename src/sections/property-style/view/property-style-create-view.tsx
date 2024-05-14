// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyStyleNewEditForm from '../property-style-new-edit-form';

// ----------------------------------------------------------------------

export default function PropertyStyleCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new property style"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Property Style',
            href: paths.dashboard.propertyType.root,
          },
          { name: 'New property style' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyStyleNewEditForm />
    </Container>
  );
}
