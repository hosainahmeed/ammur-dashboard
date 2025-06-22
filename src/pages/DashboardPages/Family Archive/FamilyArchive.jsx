import React from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import FamilyArchiveTable from '../../../Components/tables/FamilyArchive/FamilyArchiveTable';

function FamilyArchive() {
  return (
    <div>
      <PageHeading title="Family Archive" />
      <FamilyArchiveTable />
    </div>
  );
}

export default FamilyArchive;
