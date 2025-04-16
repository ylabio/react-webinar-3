import { useCallback, useEffect } from 'react';
import useStore from './use-store';
import useSelector from './use-selector';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useAuth() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));

  // Проверка авторизации при загрузке и при изменении токена
  useEffect(() => {
    const checkAuth = async () => {
      await store.actions.auth.checkAuth();
    };
    checkAuth();
  }, [store.actions.auth]);

  // Редирект при изменении состояния авторизации
  useEffect(() => {
    if (select.waiting) return;

    const isLoginPage = location.pathname === '/login';
    const isProtectedPage = location.pathname === '/profile';
    const from = location.state?.from?.pathname || '/';

    // Если авторизованы и на странице логина - редиректим откуда пришли
    if (select.isAuth && isLoginPage) {
      navigate(from, { replace: true });
    }
    // Если не авторизованы и на защищенной странице - редиректим на логин
    else if (!select.isAuth && isProtectedPage && localStorage.getItem('token')) {
      // Токен есть, но не авторизован - значит токен невалидный
      store.actions.auth.signOut(); // Очищаем невалидный токен
      navigate('/login', { replace: true });
    }
  }, [select.isAuth, select.waiting, navigate, location]);

  const signIn = useCallback(
    async (login, password) => {
      await store.actions.auth.signIn(login, password);
    },
    [store],
  );

  const signOut = useCallback(() => {
    store.actions.auth.signOut();
  }, [store]);

  const resetErrors = useCallback(() => store.actions.auth.resetErrors(), [store]);

  return {
    ...select,
    signIn,
    signOut,
    resetErrors,
  };
}
