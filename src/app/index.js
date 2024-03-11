import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PageLayout from "../components/page-layout";
import NotFoundPage from "../components/not-found-page";
import PageProduct from "../components/page-product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Main />} />
        <Route path="page/:page" element={<Main />} />
        <Route path="product/:id" element={<PageProduct />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
