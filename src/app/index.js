import RootLayout from './root';
import {createBrowserRouter,RouterProvider} from "react-router";
import HomePage from './home-page';
import ItemPage, {loader as itemDetailLoader  } from './item-page';
import ErrorPage from './error-page';
/**
 * Приложение
 * @returns {React.ReactElement}
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <HomePage />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/articles/:itemId",
    element: (
      <RootLayout>
        <ItemPage />
      </RootLayout>
    ),
    loader: itemDetailLoader,
    errorElement: <ErrorPage />,
    id: "item-detail",
  },
]);

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
