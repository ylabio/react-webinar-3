import { createBrowserRouter } from 'react-router';
import Article from '../app/article';
import App from '../app';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        Component: App,
      },
      { path: 'article/:_id', Component: Article },
    ],
  },
]);

export default router;
