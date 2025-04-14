import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import ProtectedRoute from '../components/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.actions.session.getUser();
  }, []);

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
