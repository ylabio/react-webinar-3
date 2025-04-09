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
  // Получаем язык из localStorage или используем 'ru' по умолчанию
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'ru';
  });

  // Функция для изменения языка с сохранением в localStorage
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
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
