import { Navigate, createBrowserRouter } from 'react-router-dom';
import LazyComponentWrapper from './LazyComponentWrapper';
import { lazy } from 'react';
import { PrivateRouteWrapper } from './PrivateRouteWrapper';
import { Container } from '@mui/material';
import ResponsiveAppBar from '../common/Header';

const Hotels = lazy(() => import('../hotels/Hotels'));
const BookingForm = lazy(() => import('../booking/BookingForm'));
const LoginForm = lazy(() => import('../auth/LoginForm'));
const Employees = lazy(() => import('../employee/Employees'));

export const routes = [
  {
    path: '/login',
    element: <LoginForm />,
    isAuthReq: false,
  },
  {
    path: '/',
    element: <h1>Dashboard</h1>,
  },
  {
    path: '/hotels',
    element: <Hotels />,
  },
  {
    path: '/booking/:hotelId',
    element: <BookingForm />,
  },
  {
    path: '/users',
    element: <Employees />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export const router = createBrowserRouter(
  routes.map((route) => {
    const isAuthReqForRoute = true && route['isAuthReq'] !== false;

    return {
      path: route.path,
      element: (
        <PrivateRouteWrapper isAuthReq={isAuthReqForRoute}>
          <Container maxWidth={false} sx={{ height: '100vh' }}>
            {isAuthReqForRoute ? <ResponsiveAppBar /> : null}
            <LazyComponentWrapper>{route.element}</LazyComponentWrapper>
          </Container>
        </PrivateRouteWrapper>
      ),
    };
  })
);
