import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuth: state.auth.isAuth,
  }));

  const hasToken = !!localStorage.getItem('token') || select.isAuth;
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={hasToken ? <Navigate to="/profile" replace /> : <Auth />} />
        <Route
          path={'/profile'}
          element={hasToken ? <Profile /> : <Navigate to="/login" replace />}
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
