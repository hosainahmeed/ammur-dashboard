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
import CreatNewHistory from '../Components/tables/hisory-timeline-table/CreatNewHistory';
import InterViews from '../pages/DashboardPages/InterViews/InterViews';
import LegacyTribute from '../pages/DashboardPages/Legacy & tribute/LegacyTribute';
import FamilyArchive from '../pages/DashboardPages/Family Archive/FamilyArchive';
import Events from '../pages/DashboardPages/events/Events';
import ManageAdmins from '../pages/DashboardPages/ManageAdmins/ManageAdmins';
import AboutUs from '../pages/DashboardPages/about-us/AboutUs';
import Contact from '../pages/DashboardPages/contact-us/Contact';
import RecipePage from '../pages/DashboardPages/recipes/RecipePage';
import CreateNewArchive from '../Components/tables/FamilyArchive/CreateNewArchive';
import CreateNewLegacy from '../Components/tables/legacy/CreateNewLegacy';
import CategoryInterview from '../pages/DashboardPages/InterViews/CategoryInterview';

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
        path: '/user',
        element: <UsersManage />,
      },
      {
        path: '/timeline',
        element: <HistoryTimeline />,
      },
      {
        path: '/timeline/timeline-handle',
        element: <CreatNewHistory />,
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
        path: '/things-to-know/blogs/:slug',
        element: <ThingsToKnowSpecific />,
      },
      {
        path: '/terms-condition',
        element: <TermsCondition />,
      },
      {
        path: '/contact-us',
        element: <Contact />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/add-family',
        element: <AddFamily />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
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
        element: <LegacyTribute />,
      },
      {
        path: '/family-legacy/create-new',
        element: <CreateNewLegacy />,
      },
      {
        path: '/family-archive',
        element: <FamilyArchive />,
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
      {
        path: '/profile-setting',
        element: <Profile />,
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
