// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyNewEditForm from '../property-new-edit-form';

// ----------------------------------------------------------------------

export default function PropertyCreateView() {
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Create a new property"
            links={[
              {
                name: 'Dashboard',
                href: paths.dashboard.root,
              },
              {
                name: 'Property',
                href: paths.dashboard.property.root,
              },
              { name: 'New property' },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />
    
          {/* <ProductNewEditForm /> */}
          <PropertyNewEditForm />
        </Container>
      );
};
