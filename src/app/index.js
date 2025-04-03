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
  {path: "/", Component: RootLayout, errorElement: <ErrorPage/>, children:[
    {index:true, Component: HomePage},
    {path: ":itemId", id:"item-detail", loader:itemDetailLoader,  Component: ItemPage}
  ]},
])

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
