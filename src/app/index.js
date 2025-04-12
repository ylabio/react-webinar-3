import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import AuthPage from './auth-page';
import ProfilePage from './profile-page';
import useStore from '../hooks/use-store';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const user = useSelector(state => state.user);
  const activeModal = useSelector(state => state.modals.name);

  // Загрузка профиля при наличии токена
  useEffect(() => {
    if (user.token && !user.data) {
      store.actions.user.loadProfile();
    }
  }, [user.token]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<AuthPage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
