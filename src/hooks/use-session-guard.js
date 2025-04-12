import { useEffect } from 'react';
import useStore from './use-store';
import useSelector from './use-selector';
import { useNavigate } from 'react-router-dom';

/**
 * Глобальный хук восстановления сессии
 * Проверяет токен, если он есть — загружает профиль
 * Если токена нет — редирект на /login
 */
function useSessionGuard() {
  const store = useStore();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);

  useEffect(() => {
    if (user.token) {
      // Если есть токен, но профиля нет — загружаем
      if (!profile.data) {
        store.actions.profile.load();
      }
    } else {
      // Если нет токена — редирект на /login
      navigate('/login', { replace: true });
    }
  }, [user.token, profile.data, store, navigate]);
}

export default useSessionGuard;
