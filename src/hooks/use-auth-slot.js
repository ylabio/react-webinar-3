import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from './use-selector';
import useStore from './use-store';

export default function useAuthSlotProps() {
  const store = useStore();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);

  const handleLogout = useCallback(async () => {
    await store.actions.user.logout();
    navigate('/login');
  }, [store, navigate]);

  const isLoading = user.token && !profile.data;
  const isAuthorized = Boolean(user.token && profile.data);
  const isUnauthorized = !user.token;

  const username =
    profile.data?.profile?.name?.replace(/№\s?/, '').trim() || profile.data?.login || 'Профиль';

  return {
    isLoading,
    isAuthorized,
    isUnauthorized,
    username,
    handleLogout,
  };
}
