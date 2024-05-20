// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetPropertyType } from 'src/api/propertyType';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyTypeNewEditForm from 'src/sections/property-type/property-type-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PropertyTypeEditView({ id }: Props) {
  const settings = useSettingsContext();
  
  const { propertyType: currentPropertyType } = useGetPropertyType(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Property Type',
            href: paths.dashboard.propertyType.root,
          },
          { name: currentPropertyType?.name_en },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyTypeNewEditForm currentPropertyType={currentPropertyType} />
    </Container>
  );
}
