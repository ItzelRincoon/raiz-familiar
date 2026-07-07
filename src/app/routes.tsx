import { createBrowserRouter, Navigate } from "react-router";
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { FamilyTree } from './components/FamilyTree';
import { EventHub } from './components/EventHub';
import { InvitationCreator } from './components/InvitationCreator';
import { Cookbook } from './components/Cookbook';
import { TimeCapsules } from './components/TimeCapsules';
import { SOSTablon } from './components/SOSTablon';
import { MoreMenu } from './components/MoreMenu';
import { SettingsScreen } from './components/SettingsScreen';
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: OnboardingScreen,
  },
  {
    path: "/",
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", Component: HomeDashboard },
      { path: "tree", Component: FamilyTree },
      { path: "events", Component: EventHub },
      { path: "cookbook", Component: Cookbook },
      { path: "invitation", Component: InvitationCreator },
      { path: "capsules", Component: TimeCapsules },
      { path: "sos", Component: SOSTablon },
      { path: "more", Component: MoreMenu },
      { path: "settings", Component: SettingsScreen },
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
]);
