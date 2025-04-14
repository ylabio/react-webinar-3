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
  const session = useSelector(state => state.session);
  const profile = useSelector(state => state.profile);
  const activeModal = useSelector(state => state.modals.name);

  // Загрузка профиля при наличии токена
  useEffect(() => {
    if (session.token && !profile.user) {
      store.actions.profile.loadCurrentUser(session.token);
    }
  }, [session.token, profile.user, store.actions.profile]);

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
