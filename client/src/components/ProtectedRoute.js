import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
  const { auth } = useAuth();

  if (!auth.user || auth.user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;