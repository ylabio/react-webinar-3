import Main from './main';
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
    element: <Article />,
  },
]);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <>
      <TranslationProvider>
        <RouterProvider router={router} fallbackElement={<div>Загрузка...</div>} />
      </TranslationProvider>
    </>
  );
}

export default App;
