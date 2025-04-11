import { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthView from '../../components/auth-view';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';

function AuthContainer() {
  const navigate = useNavigate();
  const { user, token } = useSelector(state => ({
    user: state.login?.user,
    token: state.login?.token
  }));
  
  const store = useStore();
  const { t } = useTranslate();

  const handleLogout = useCallback(() => {
    store.actions.login.logout();
    navigate('/');
  }, [store]);

  return (
    <AuthView 
      loginTitle={t('login.title')}
      logoutTitle={t('logout.title')}
      isAuth={!!token}
      username={user?.profile?.name}
      onLogout={handleLogout}
    />
  );
}

export default AuthContainer;