import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function AdminRoutes() {
  const hasToken = localStorage.getItem("token")
  const decoded = hasToken ? jwt_decode(hasToken) : "";
  const isAdmin = decoded.isAdmin

  return (
    isAdmin ? <Outlet /> : <Navigate to='/' />
  )
}

export default AdminRoutes