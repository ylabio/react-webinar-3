import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ProductPage from './product-page';
import ErrorPage from './error';
import useSelector from '../store/use-selector';

function Layout() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/articles/:itemId',
        element: <ProductPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
