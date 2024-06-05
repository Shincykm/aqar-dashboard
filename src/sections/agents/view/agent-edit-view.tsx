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
import AgentNewEditForm from 'src/sections/agents/agent-new-edit-form';
import { useGetAgent } from 'src/api/agent';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function AgentsEditView({ id }: Props) {
  const settings = useSettingsContext();
  
  const { agents: currentAgent } = useGetAgent(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Amenities',
            href: paths.dashboard.agents.root,
          },
          { name: currentAgent?.name_en },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AgentNewEditForm currentAgent={currentAgent} />
    </Container>
  );
}
