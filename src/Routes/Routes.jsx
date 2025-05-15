import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Otp from "../pages/Auth/Otp";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";
import UsersManage from "../pages/DashboardPages/UsersManage/UsersManage";
import TermsCondition from "../pages/DashboardPages/terms&condition/TermsCondition";
import PrivateRoute from "./PrivetRoute";
import PrivacyPolicy from "../pages/DashboardPages/privacy&policy/PrivacyPolicy";
import EarningPage from "../pages/DashboardPages/EarningManage/EarningPage";
import Subscription from "../pages/DashboardPages/Subscription/Subscription";
import ThingsToKnow from "../pages/DashboardPages/ThingsToKnow/ThingsToKnow";
import Profile from "../pages/DashboardPages/ProfilePages/Profile";
import HistoryTimeline from "../pages/DashboardPages/history-timeline/HistoryTimeline";
import CreatNewHistory from "../Components/tables/hisory-timeline-table/CreatNewHistory";
import InterViews from "../pages/DashboardPages/InterViews/InterViews";
import Recipe from "../pages/DashboardPages/recipes/Recipe";
import LegacyTribute from "../pages/DashboardPages/Legacy & tribute/LegacyTribute";
import FamilyArchive from "../pages/DashboardPages/Family Archive/FamilyArchive";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/user",
        element: <UsersManage />,
      },
      {
        path: "/timeline",
        element: <HistoryTimeline />,
      },
      {
        path: "/timeline/create-new",
        element: <CreatNewHistory />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/things-to-know",
        element: <ThingsToKnow />,
      },
      {
        path: "/terms-condition",
        element: <TermsCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/earnings",
        element: <EarningPage />,
      },
      {
        path: "/interviews",
        element: <InterViews />,
      },
      {
        path: "/legacy-tribute",
        element: <LegacyTribute />,
      },
      {
        path: "/family-archive",
        element: <FamilyArchive />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/profile-setting",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
