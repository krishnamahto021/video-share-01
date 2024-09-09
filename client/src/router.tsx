import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/UserProfile";
import {
  ProtectedRoute,
  ProtectedRouteHome,
} from "./components/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<SignUp />} />,
  },
  {
    path: "/sign-in",
    element: <ProtectedRoute element={<SignIn />} />,
  },
  {
    path: "/user/dashboard",
    element: <ProtectedRouteHome element={<Dashboard />} />,
  },
  {
    path: "/user/profile",
    element: <ProtectedRouteHome element={<UserProfile />} />,
  },
]);
