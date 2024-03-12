import { RouterProvider } from 'react-router-dom';
import router from '../router';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
