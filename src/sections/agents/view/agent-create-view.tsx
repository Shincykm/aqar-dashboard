// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import AgentNewEditForm from '../agent-new-edit-form';

// ----------------------------------------------------------------------

export default function AgentCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Agent"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Agents',
            href: paths.dashboard.agents.root,
          },
          { name: 'New Agent' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AgentNewEditForm />
    </Container>
  );
}
