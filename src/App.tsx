import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HotelList } from './hotels/HotelList';
import { RoomList } from './rooms/RoomsList';
import { AddGuestsForm } from './guests/AddGuestsForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Dashboard, deleted fork, first commit to dev mangalam</h1>,
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
