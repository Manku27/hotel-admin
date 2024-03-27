import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HotelList } from './hotels/HotelList';
import { RoomList } from './rooms/RoomsList';
import { AddGuestsForm } from './guests/AddGuestsForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Dashboard</h1>,
  },
  {
    path: '/hotel',
    element: <HotelList />,
  },
  {
    path: '/rooms',
    element: <RoomList />,
  },
  {
    path: '/addGuest',
    element: <AddGuestsForm />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
