import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  isAuthReq: boolean;
  children: ReactNode;
}

export const PrivateRouteWrapper = ({ children, isAuthReq }: Props) => {
  const isAuthenticated = false;
  const location = useLocation();

  if (isAuthenticated && !isAuthReq) {
    return <Navigate to="/" replace />;
  } else if (!isAuthenticated && isAuthReq) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
