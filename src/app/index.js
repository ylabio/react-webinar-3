import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
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
  const [language, setLanguage] = useState(() => {
    return sessionStorage.getItem('appLanguage') || 'ru';
  });

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    sessionStorage.setItem('appLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleLanguageChange
    }}>
      <RouterProvider router={router} />
    </LanguageContext.Provider>
  );
}

export default App;
