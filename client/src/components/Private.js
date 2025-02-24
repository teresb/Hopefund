// src/components/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth }) => {
  return auth && auth.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
