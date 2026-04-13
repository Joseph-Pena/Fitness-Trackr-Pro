import { Routes, Route } from "react-router";

import Layout from "./layout/Layout.jsx";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityPage from "./activities/ActivityPage.jsx";
import Error404 from "./Error404.jsx";
import RoutinesPage from "./routines/RoutinesPage";
import RoutinePage from "./routines/RoutinePage";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<ActivitiesPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activities/:id" element={<ActivityPage />} />
      <Route path="/routines" element={<RoutinesPage />} />
      <Route path="/routines/:id" element={<RoutinePage />} />
      <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
