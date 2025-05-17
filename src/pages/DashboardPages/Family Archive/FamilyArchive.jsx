import React from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import FamilyArchiveTable from '../../../Components/tables/FamilyArchive/FamilyArchiveTable';

function FamilyArchive() {
  return (
    <div>
      <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
        <PageHeading title="Family Archive" />
      </div>
      <FamilyArchiveTable />
    </div>
  );
}

export default FamilyArchive;
