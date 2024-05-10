// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetProperty } from 'src/api/property';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyNewEditForm from '../property-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PropertyEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { property: currentProperty } = useGetProperty(id);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Property',
            href: paths.dashboard.property.root,
          },
          { name: currentProperty?.nameEn },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyNewEditForm currentProperty={currentProperty} />
    </Container>
  );
}
