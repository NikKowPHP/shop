import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthMiddleware({children}) {

  const {isLoggedIn} = useAuth();
  if(!isLoggedIn) {
    return <Navigate to="/login" />
  }
  return children
}
