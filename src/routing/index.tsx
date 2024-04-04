import { createBrowserRouter } from 'react-router-dom';
import LazyComponentWrapper from './LazyComponentWrapper';
import { lazy } from 'react';

const AddHotelForm = lazy(() => import('../hotels/AddHotelForm'));
const AddRoomForm = lazy(() => import('../rooms/AddRoomForm'));
const BookingForm = lazy(() => import('../booking/BookingForm'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LazyComponentWrapper>
        <h1>Dashboard</h1>
      </LazyComponentWrapper>
    ),
  },
  {
    path: '/hotel',
    element: (
      <LazyComponentWrapper>
        <AddHotelForm />
      </LazyComponentWrapper>
    ),
  },
  {
    path: '/rooms',
    element: (
      <LazyComponentWrapper>
        <AddRoomForm />
      </LazyComponentWrapper>
    ),
  },
  {
    path: '/booking',
    element: (
      <LazyComponentWrapper>
        <BookingForm />
      </LazyComponentWrapper>
    ),
  },
]);
