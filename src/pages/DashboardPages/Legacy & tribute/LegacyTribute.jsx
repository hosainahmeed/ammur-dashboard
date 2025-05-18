import React from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import LegacyTable from '../../../Components/tables/legacy/LegacyTable';

function LegacyTribute() {
  return (
    <div>
      <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
        <PageHeading title="Legacy & tribute" />
      </div>
      <LegacyTable />
    </div>
  );
}

export default LegacyTribute;
