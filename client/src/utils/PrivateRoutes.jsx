import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  const isAuth = !!localStorage.getItem("token");
  return (
    isAuth ? <Outlet /> : <Navigate to='/' />
  )
}

export default PrivateRoutes