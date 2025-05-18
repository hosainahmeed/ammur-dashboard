import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivetRoute';

// Lazy imports for pages
const Login = lazy(() => import('../pages/Auth/Login'));
const ForgetPassword = lazy(() => import('../pages/Auth/ForgetPassword'));
const Otp = lazy(() => import('../pages/Auth/Otp'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));

const Dashboard = lazy(() => import('../Layout/Dashboard'));
const DashboardHome = lazy(() =>
  import('../pages/DashboardPages/DashboardHome/DashboardHome')
);
const UsersManage = lazy(() =>
  import('../pages/DashboardPages/UsersManage/UsersManage')
);
const TermsCondition = lazy(() =>
  import('../pages/DashboardPages/terms&condition/TermsCondition')
);
const PrivacyPolicy = lazy(() =>
  import('../pages/DashboardPages/privacy&policy/PrivacyPolicy')
);
const EarningPage = lazy(() =>
  import('../pages/DashboardPages/EarningManage/EarningPage')
);
const Subscription = lazy(() =>
  import('../pages/DashboardPages/Subscription/Subscription')
);
const ThingsToKnow = lazy(() =>
  import('../pages/DashboardPages/ThingsToKnow/ThingsToKnow')
);
const Profile = lazy(() =>
  import('../pages/DashboardPages/ProfilePages/Profile')
);
const HistoryTimeline = lazy(() =>
  import('../pages/DashboardPages/history-timeline/HistoryTimeline')
);
const CreatNewHistory = lazy(() =>
  import('../Components/tables/hisory-timeline-table/CreatNewHistory')
);
const InterViews = lazy(() =>
  import('../pages/DashboardPages/InterViews/InterViews')
);
const LegacyTribute = lazy(() =>
  import('../pages/DashboardPages/Legacy & tribute/LegacyTribute')
);
const FamilyArchive = lazy(() =>
  import('../pages/DashboardPages/Family Archive/FamilyArchive')
);
const Blogs = lazy(() =>
  import('../pages/DashboardPages/ThingsToKnow/SpacaficOne/Blogs')
);
const Events = lazy(() => import('../pages/DashboardPages/events/Events'));
const ManageAdmins = lazy(() =>
  import('../pages/DashboardPages/ManageAdmins/ManageAdmins')
);
const AboutUs = lazy(() => import('../pages/DashboardPages/about-us/AboutUs'));
const Contact = lazy(() =>
  import('../pages/DashboardPages/contact-us/Contact')
);
const RecipePage = lazy(() =>
  import('../pages/DashboardPages/recipes/RecipePage')
);
const CreateNewArchive = lazy(() =>
  import('../Components/tables/FamilyArchive/CreateNewArchive')
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div class="spinner"></div>
  </div>
);

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Dashboard />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: '/user',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UsersManage />
          </Suspense>
        ),
      },
      {
        path: '/timeline',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HistoryTimeline />
          </Suspense>
        ),
      },
      {
        path: '/timeline/create-new',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CreatNewHistory />
          </Suspense>
        ),
      },
      {
        path: '/subscription',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Subscription />
          </Suspense>
        ),
      },
      {
        path: '/things-to-know',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ThingsToKnow />
          </Suspense>
        ),
      },
      {
        path: '/things-to-know/blogs/:slug',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: '/terms-condition',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TermsCondition />
          </Suspense>
        ),
      },
      {
        path: '/contact-us',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/about-us',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: '/privacy-policy',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: '/earnings',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EarningPage />
          </Suspense>
        ),
      },
      {
        path: '/interviews',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <InterViews />
          </Suspense>
        ),
      },
      {
        path: '/legacy-tribute',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LegacyTribute />
          </Suspense>
        ),
      },
      {
        path: '/family-archive',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FamilyArchive />
          </Suspense>
        ),
      },
      {
        path: '/family-archive/create-new',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CreateNewArchive />
          </Suspense>
        ),
      },
      {
        path: '/manage-admins',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManageAdmins />
          </Suspense>
        ),
      },
      {
        path: '/events',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: '/recipe',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RecipePage />
          </Suspense>
        ),
      },
      {
        path: '/profile-setting',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: '/otp',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Otp />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResetPassword />
      </Suspense>
    ),
  },
]);
