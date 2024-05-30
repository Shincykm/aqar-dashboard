import { Helmet } from 'react-helmet-async';
import { AgentsListView } from 'src/sections/agents/view';
// sections

// ----------------------------------------------------------------------

export default function AgentsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property type List</title>
      </Helmet>

      <AgentsListView />
    </>
  );
}
