import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivetRoute';
import Dashboard from '../Layout/Dashboard';
import ThingsToKnowSpecific from '../pages/DashboardPages/ThingsToKnow/SpacaficOne/SingleThingstoKnow';

// Normal imports for pages
import Login from '../pages/Auth/Login';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import Otp from '../pages/Auth/Otp';
import ResetPassword from '../pages/Auth/ResetPassword';
import DashboardHome from '../pages/DashboardPages/DashboardHome/DashboardHome';
import UsersManage from '../pages/DashboardPages/UsersManage/UsersManage';
import AddFamily from '../pages/DashboardPages/add-family/AddFamily';
import TermsCondition from '../pages/DashboardPages/terms&condition/TermsCondition';
import PrivacyPolicy from '../pages/DashboardPages/privacy&policy/PrivacyPolicy';
import EarningPage from '../pages/DashboardPages/EarningManage/EarningPage';
import Subscription from '../pages/DashboardPages/Subscription/Subscription';
import ThingsToKnow from '../pages/DashboardPages/ThingsToKnow/ThingsToKnow';
import Profile from '../pages/DashboardPages/ProfilePages/Profile';
import HistoryTimeline from '../pages/DashboardPages/history-timeline/HistoryTimeline';
import InterViews from '../pages/DashboardPages/InterViews/InterViews';
import LegacyTable from '../Components/tables/legacy/LegacyTable';
import Events from '../pages/DashboardPages/events/Events';
import ManageAdmins from '../pages/DashboardPages/ManageAdmins/ManageAdmins';
import AboutUs from '../pages/DashboardPages/about-us/AboutUs';
import Contact from '../pages/DashboardPages/contact-us/Contact';
import RecipePage from '../pages/DashboardPages/recipes/RecipePage';
import CreateNewArchive from '../Components/tables/FamilyArchive/CreateNewArchive';
import CreateNewLegacy from '../Components/tables/legacy/CreateNewLegacy';
import CategoryInterview from '../pages/DashboardPages/InterViews/CategoryInterview';
import RequestUser from '../Components/tables/User/RequestUser';
import CategoryArchive from '../pages/DashboardPages/Family Archive/CategoryArchive';
import FamilyArchiveTable from '../Components/tables/FamilyArchive/FamilyArchiveTable';
import AllNotificationPage from '../pages/DashboardPages/AllNotificationPage/AllNotificationPage';
import UploadImage from '../pages/DashboardPages/UploadImage/UploadImage.jsx';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <DashboardHome />,
      },
      {
        path: '/user/all-user',
        element: <UsersManage />,
      },
      {
        path: '/user/sign-up-request',
        element: <RequestUser />,
      },
      {
        path: '/timeline',
        element: <HistoryTimeline />,
      },
      {
        path: '/subscription',
        element: <Subscription />,
      },
      {
        path: '/things-to-know',
        element: <ThingsToKnow />,
      },
      {
        path: '/things-to-know/:id',
        element: <ThingsToKnowSpecific />,
      },
      {
        path: '/dashboard/Settings/Notification',
        element: <AllNotificationPage />,
      },
      {
        path: '/dashboard/Settings/Terms&Condition',
        element: <TermsCondition />,
      },
      {
        path: '/dashboard/Settings/PrivacyPolicy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/dashboard/Settings/profile',
        element: <Profile />,
      },
      {
        path: '/dashboard/Settings/upload-image',
        element: <UploadImage />,
      },
      {
        path: '/dashboard/Settings/contact-us',
        element: <Contact />,
      },
      {
        path: '/dashboard/Settings/about-us',
        element: <AboutUs />,
      },
      
      {
        path: '/add-family',
        element: <AddFamily />,
      },
      
      {
        path: '/earnings',
        element: <EarningPage />,
      },
      {
        path: '/interviews',
        element: <CategoryInterview />,
      },
      {
        path: '/interviews/:id',
        element: <InterViews />,
      },
      {
        path: '/legacy-tribute',
        element: <LegacyTable />,
      },
      {
        path: '/family-archive',
        element: <CategoryArchive />,
      },
      {
        path: '/family-archive/:id',
        element: <FamilyArchiveTable />,
      },
      {
        path: '/family-archive/create-new',
        element: <CreateNewArchive />,
      },
      {
        path: '/manage-admins',
        element: <ManageAdmins />,
      },
      {
        path: '/events',
        element: <Events />,
      },
      {
        path: '/recipe',
        element: <RecipePage />,
      },
      
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
  },
  {
    path: '/otp',
    element: <Otp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);
