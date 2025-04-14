import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import Profile from './profile';
import useCheckAuth from '../hooks/use-check-auth';
import PrivatRoute from '../hoc/privat-route';
import OnlyPublic from '../hoc/only-public-route';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  useCheckAuth();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuth: state.user.isAuth,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path={'/login'}
          element={
            <OnlyPublic>
              <Auth />
            </OnlyPublic>
          }
        />
        <Route
          path={'/profile'}
          element={
            <PrivatRoute>
              <Profile />
            </PrivatRoute>
          }
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
