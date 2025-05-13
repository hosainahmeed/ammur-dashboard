import React from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAuthorized, setIsAuthorized] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       if (decoded.role === 'ADMIN') {
  //         setIsAuthorized(true);
  //       } else {
  //         setIsAuthorized(false);
  //       }
  //     } catch (error) {
  //       console.error('Invalid token', error);
  //     }
  //   }
  //   setIsLoading(false);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-screen">
  //       <span className="loader-black"></span>
  //     </div>
  //   );
  // }

  // return isAuthorized ? children : <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router";
// import { jwtDecode } from "jwt-decode";

// const PrivateRoute = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const role = decoded.role;

//         if (role === "ADMIN" || role === "SUPER_ADMIN") {
//           setIsAuthorized(true);
//           setUserRole(role);
//         }
//       } catch (error) {
//         console.error("Invalid token", error);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen">
//         <span className="loader-black"></span>
//       </div>
//     );
//   }

//   return !isAuthorized ? (
//     React.cloneElement(children, { userRole })
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;
