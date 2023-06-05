import { useCallback } from 'react';
import useStore from './use-store';
import useSelector from './use-selector';

/**
 * Хук аутентификации
 */
export default function useAuth() {
  const store = useStore();
  const { isAuth, waiting } = useSelector((state) => state.user);
  const auth = useCallback(() => store.actions.user.auth(), []);

  return { auth, isAuth, waiting };
}
