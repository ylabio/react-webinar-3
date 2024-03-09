import useSelector from "../store/use-selector";
import Home from "./home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Item, { itemLoader } from "./item";
import { Outlet } from "react-router-dom";
import RootLayout from "../components/root-layout";
/**
 * Приложение
 * @returns {React.ReactElement}
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ":id",
        element: <Item />,
        id: "itemCard",
        // loader: itemLoader,
      },
    ],
  },
]);

function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
