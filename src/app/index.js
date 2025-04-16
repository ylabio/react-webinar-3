import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import ProtectedRoute from '../components/protected-route';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const { isAuthChecked } = useSelector(state => state.auth);

  useEffect(() => {
    store.actions.auth.checkAuth();
  }, []);

  const activeModal = useSelector(state => state.modals.name);

  if (!isAuthChecked) {
    return <div>Загрузка приложения...</div>;
  }

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
