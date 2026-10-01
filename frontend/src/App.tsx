import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { SessionExpiredModal } from './features/auth/components/SessionExpiredModal';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SessionExpiredModal />
    </>
  );
}

export default App;
