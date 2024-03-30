import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RoomList } from './rooms/RoomsList';
import { AddGuestsForm } from './guests/AddGuestsForm';
import AddHotelForm from './hotels/AddHotelForm';

const router = createBrowserRouter([
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
