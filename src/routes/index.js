import { memo } from 'react';
import { Route, Routes } from 'react-router';
import Main from '../app/main';
import Article from '../app/article';
import NotFound from '../components/not-found';

function AppRoutes() {
  const navigationRoutes = [
    { path: '/', element: <Main /> },
    { path: '/page/:pageNumber', element: <Main /> },
    { path: '/article/:userId', element: <Article /> },
    { path: '*', element: <NotFound /> },
  ];

  return (
    <Routes>
      {navigationRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default memo(AppRoutes);
