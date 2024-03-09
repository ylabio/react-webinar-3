import {
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider} from 'react-router-dom';
import PageLayout from '../components/page-layout';
import HomePage from '../pages/home-page';
import ItemPage, { itemLoader } from '../pages/item-page';
import ErrorPage from '../pages/error-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="items/:itemId"
        element={<ItemPage />}
        loader={itemLoader}
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
