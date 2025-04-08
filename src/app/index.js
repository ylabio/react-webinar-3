import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ProductPage from './product-page';
import ErrorPage from './error';
import useSelector from '../store/use-selector';

const routes = [
  {
    path: '/',
    element: <MainWrapper />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/articles/:itemId',
    element: <ProductPageWrapper />,
    errorElement: <ErrorPage />,
  },
];

function MainWrapper() {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <Main />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

function ProductPageWrapper() {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <ProductPage />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
