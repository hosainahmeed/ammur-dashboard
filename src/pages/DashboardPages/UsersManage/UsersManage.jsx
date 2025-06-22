import React from 'react';
import AllUsers from '../../../Components/tables/User/AllUsers';
import PageHeading from '../../../Components/Shared/PageHeading';

function UsersManage() {
  return (
    <div>
      <PageHeading title="Users Manage" />
      <AllUsers />
    </div>
  );
}

export default UsersManage;
