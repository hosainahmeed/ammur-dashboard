import React from 'react';
// import Sidebar from '../Components/Shared/Sidebar.jsx';
// import Header from '../Components/Shared/Header.jsx';
// import { Outlet } from 'react-router';
// const Dashboard = () => {
//   return (
//     <div className="max-h-screen bg-[var(--color-white)] overflow-hidden">
//       <Header />
//       <div className="scroll-bar-hide flex gap-0 h-screen overflow-y-scroll">
//         <div className="pt-4 w-[300px] h-[calc(100vh-64px)] overflow-y-scroll pb-10 box-border bg-[var(--color-white)]">
//           <Sidebar />
//         </div>
//         <div className="w-[calc(100%-300px)] bg-[var(--color-gray-20)] h-screen">
//           <div className="bg-blue-50/60 scroll-bar-hide w-full p-5 rounded-md h-[calc(100vh-110px)] overflow-y-scroll">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Shared/Sidebar.jsx';
import Header from '../Components/Shared/Header.jsx';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-dvh bg-[var(--color-white)]">
      {/* Header */}
      <header className="bg-[var(--color-white)]  border-gray-700">
        <div className="max-w-full mx-auto">
          <Header />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed on large screens */}
        <div className="flex flex-shrink-0">
          <div className="flex flex-col w-[300px] bg-[var(--color-white)]">
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-full h-[calc(100vh-64px)] mx-auto p-4 sm:p-6 md:p-8 w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
