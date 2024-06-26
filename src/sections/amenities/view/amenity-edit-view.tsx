// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetAmenity } from 'src/api/amenities';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import AmenityNewEditForm from 'src/sections/amenities/amenity-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function AmenityEditView({ id }: Props) {
  const settings = useSettingsContext();
  
  const { amenities: currentAmenity } = useGetAmenity(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Amenities',
            href: paths.dashboard.amenities.root,
          },
          { name: currentAmenity?.name_en },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AmenityNewEditForm currentAmenity={currentAmenity} />
    </Container>
  );
}
