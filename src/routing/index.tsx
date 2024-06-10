import { Navigate, createBrowserRouter } from 'react-router-dom';
import LazyComponentWrapper from './LazyComponentWrapper';
import { lazy } from 'react';
import { PrivateRouteWrapper } from './PrivateRouteWrapper';
import { Container } from '@mui/material';
import Header from '../common/Header';

const Hotels = lazy(() => import('../hotels/Hotels'));
const BookingForm = lazy(() => import('../booking/BookingForm'));
const LoginForm = lazy(() => import('../auth/LoginForm'));
const Employees = lazy(() => import('../employee/Employees'));
const Availability = lazy(() => import('../availability/Availability'));
const Bookings = lazy(() => import('../booking/Bookings'));

export const routes = [
  {
    path: '/login',
    element: <LoginForm />,
    isAuthReq: false,
  },
  {
    path: '/',
    element: <Hotels />,
  },
  {
    path: '/book/:hotelId',
    element: <BookingForm />,
  },
  {
    path: '/hotel/:hotelId',
    element: <Availability />,
  },
  {
    path: '/bookings/:hotelId',
    element: <Bookings />,
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
            {isAuthReqForRoute ? <Header /> : null}
            <LazyComponentWrapper>{route.element}</LazyComponentWrapper>
          </Container>
        </PrivateRouteWrapper>
      ),
    };
  })
);
