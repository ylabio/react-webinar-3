import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './use-store';
import useSelector from './use-selector';

export default function useAuth(redirectIfAuthenticated = false) {
  const store = useStore();
  const navigate = useNavigate();
  const { token, initialized } = useSelector(state => ({
    token: state.auth.token,
    initialized: state.auth.initialized,
  }));

  useEffect(() => {
    if (!initialized) return;

    // Если требуется редирект для авторизованных (например, на странице логина)
    if (redirectIfAuthenticated && token) {
      navigate('/', { replace: true });
    }
    // Если требуется проверка авторизации (для защищенных страниц)
    else if (!redirectIfAuthenticated && !token) {
      navigate('/login', { replace: true });
    }
  }, [token, initialized, navigate, redirectIfAuthenticated]);

  return { token, initialized };
}
