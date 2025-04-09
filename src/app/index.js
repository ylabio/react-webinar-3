import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Article from './article';
import { TranslationProvider } from '../translation/TranslationContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/articles/:articleId',
    hydrateFallbackElement: <></>,
    loader: async ({ params }) => {
      let article = await fetch(`/api/v1/articles/${params.articleId}`);
      return article;
    },
    element: <Article />,
  },
]);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  // const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <TranslationProvider>
        <RouterProvider router={router} fallbackElement={<div>Загрузка...</div>} />
        {/* {activeModal === 'basket' && <Basket />} */}
      </TranslationProvider>
    </>
  );
}

export default App;
