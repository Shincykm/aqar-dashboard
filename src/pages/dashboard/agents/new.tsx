import { Helmet } from 'react-helmet-async';
// sections
import {AgentsCreateView} from 'src/sections/agents/view';

// ----------------------------------------------------------------------

export default function AgentsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new agent</title>
      </Helmet>

      <AgentsCreateView />
    </>
  );
}