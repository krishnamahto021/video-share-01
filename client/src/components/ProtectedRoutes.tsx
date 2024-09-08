import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../redux/reducers/auth/authReducer";
import { Navigate } from "react-router-dom";

interface RouteProps {
  element: ReactNode;
}
//this route is for all logged in user
export const ProtectedRouteHome: React.FC<RouteProps> = ({ element }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  return loggedInUser?.token ? element : <Navigate to={"/sign-in"} />;
};

// this route is for the user that if he is logged in dont show the sign up and sing in page
export const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  return loggedInUser?.token ? <Navigate to={"/user/dashboard"} /> : element;
};
