import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from './use-selector';
import useStore from './use-store';

export default function useAuthSlotProps() {
  const store = useStore();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleLogout = useCallback(async () => {
    await store.actions.user.logout();
    navigate('/login');
  }, [store, navigate]);

  const isLoading = user.token && !user.data;
  const isAuthorized = Boolean(user.token && user.data);
  const isUnauthorized = !user.token && !user.data;
  const username = user.data?.profile?.name?.replace(/№\s?/, '').trim() || 'Профиль';

  return {
    isLoading,
    isAuthorized,
    isUnauthorized,
    username,
    handleLogout,
  };
}
