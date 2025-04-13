import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import AuthHeader from '../../components/auth-header';
import useTranslate from '../../hooks/use-translate';
import useAuth from '../../hooks/use-auth';

/**
 * Панель авторизации
 */
function AuthPanel() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();




  useInit(() => {
    store.actions.user.getProfile();
  }, []);

  const {auth, user} = useAuth();

  const handleLogout = useCallback(() => {
    store.actions.user.logout();
  }, [store, navigate]);

  return (
    <AuthHeader auth={auth} userName={user?.username} handleLogout={handleLogout} t={t}/>
  );
}

export default memo(AuthPanel);
