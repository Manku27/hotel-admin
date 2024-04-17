import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from '../services/auth-service';

interface Props {
  isAuthReq: boolean;
  children: ReactNode;
}

export const PrivateRouteWrapper = ({ children, isAuthReq }: Props) => {
  const auth = getAuth();
  const isAuthenticated = !!auth;

  const location = useLocation();

  if (isAuthenticated && !isAuthReq) {
    return <Navigate to="/" replace />;
  } else if (!isAuthenticated && isAuthReq) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
