import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Main from './main';
import Basket from './basket';
import ProductPage, { loader as productLoader } from './product-page';
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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
        loader: productLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
