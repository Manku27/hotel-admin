import { Navigate, createBrowserRouter } from 'react-router-dom';
import LazyComponentWrapper from './LazyComponentWrapper';
import { lazy } from 'react';
import { PrivateRouteWrapper } from './PrivateRouteWrapper';

const AddHotelForm = lazy(() => import('../hotels/AddHotelForm'));
const AddRoomForm = lazy(() => import('../rooms/AddRoomForm'));
const BookingForm = lazy(() => import('../booking/BookingForm'));
const LoginForm = lazy(() => import('../auth/LoginForm'));

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
    path: '/hotel',
    element: <AddHotelForm />,
  },
  {
    path: '/rooms',
    element: <AddRoomForm />,
  },
  {
    path: '/booking',
    element: <BookingForm />,
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
          <LazyComponentWrapper>{route.element}</LazyComponentWrapper>
        </PrivateRouteWrapper>
      ),
    };
  })
);
