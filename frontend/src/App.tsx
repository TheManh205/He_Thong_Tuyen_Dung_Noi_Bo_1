import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { SessionExpiredModal } from './features/auth/components/SessionExpiredModal';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
      <SessionExpiredModal />
    </>
  );
}

export default App;
