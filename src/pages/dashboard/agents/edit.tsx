import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { AgentsEditView } from 'src/sections/agents/view';

export default function  EditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Agents Edit</title>
      </Helmet>

      <AgentsEditView id={`${id}`} />
    </>
  );
};
