import { useEffect } from 'react';
import useStore from './use-store';
import useSelector from './use-selector';

/**
 * Глобальный хук восстановления сессии
 * Загружает профиль, если есть токен и нет user.data
 */
function useSessionGuard() {
  const store = useStore();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.token && !user.data) {
      store.actions.user.loadProfile();
    }
  }, [user.token, user.data]);
}

export default useSessionGuard;
