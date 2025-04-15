import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Profile from './profile';
import Header from './header';
import Login from './login';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const authorized = useSelector(state => state.user.authorized);
  const activeModal = useSelector(state => state.modals.name);
  const location = useLocation();

  // Воcстановление сессии
  useEffect(() => {
    store.actions.user.restore();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path="/login" element={authorized ? <Navigate to="/profile" replace /> : <Login />} />
        <Route path="/profile" element={authorized ? <Profile /> : <Navigate to="/login" replace state={{ from: location }} />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
