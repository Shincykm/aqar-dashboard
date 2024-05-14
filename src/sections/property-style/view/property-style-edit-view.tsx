// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetPropertyStyle } from 'src/api/propertyStyle';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PropertyStyleNewEditForm from 'src/sections/property-style/property-style-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: number | string;
};

export default function PropertyStyleEditView({ id }: Props) {
  const settings = useSettingsContext();
  
  const { propertyStyles: currentPropertyStyle } = useGetPropertyStyle(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Property Type',
            href: paths.dashboard.propertyStyle.root,
          },
          { name: currentPropertyStyle?.name_en },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PropertyStyleNewEditForm currentPropertyStyle={currentPropertyStyle} />
    </Container>
  );
}
