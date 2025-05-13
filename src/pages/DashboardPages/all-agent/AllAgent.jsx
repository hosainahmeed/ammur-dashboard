import React from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import AgentTable from '../../../Components/tables/post-table/AgentTable';

function AllAgent() {
  return (
    <div>
      <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
        <PageHeading title="Manage post" />
      </div>
      <AgentTable />
    </div>
  );
}

export default AllAgent;
