import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGetProfileDataQuery } from '../Redux/services/profileApis';

const PrivateRoute = ({ children }) => {
  const { data, isLoading } = useGetProfileDataQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loader-black"></span>
      </div>
    );
  }


  const role = data?.data?.role;
  const isAuthorized = role === 'superAdmin' || role === 'admin';

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
