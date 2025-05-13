import React from 'react';
import AllUsers from '../../../Components/tables/User/AllUsers';
import PageHeading from '../../../Components/Shared/PageHeading';

function UsersManage() {
  return (
    <div>
      <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
        <PageHeading title="Users Manage" />
      </div>
      <AllUsers />
    </div>
  );
}

export default UsersManage;
