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
    if (user.token && !profile.data) {
      store.actions.profile.load();
    }
  }, [user.token, profile.data]);
}

export default useSessionGuard;
