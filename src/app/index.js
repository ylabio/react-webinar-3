import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login-page';
import AuthButton from '../components/auth-button';
import useTranslate from '../hooks/use-translate';
import useStore from '../hooks/use-store';
import ProtectedRoute from './protected-route';
import ProfilePage from './profile-page';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuth: state.user.isAuth,
    userName: state.user.profile.name,
  }));
  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  useEffect(() => {
    store.actions.user.checkAuth();
  }, [store]);

  return (
    <>
      <AuthButton
        title={select.isAuth ? t('logout.button') : t('login.button')}
        routes={{ login: '/login', profile: '/profile' }}
        userName={select.userName}
        onClick={select.isAuth ? callbacks.logout : () => {}}
      />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
