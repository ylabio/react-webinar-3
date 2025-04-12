import { memo, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import AuthActionButton from '../../components/auth-action-button';
import useInit from '../../hooks/use-init';

function AuthButton() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const { user, token } = useSelector(state => state.session);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useInit(async () => {
    if (token) {
      await store.actions.session.checkAuth();
    }
    setIsCheckingAuth(false);
  }, [token, store]);

  const callbacks = {
    signOut: async () => {
      await store.actions.session.signOut();
      navigate('/');
    },
    signIn: () => {
      navigate('/login');
    },
    profileClick: () => {
      navigate(user?.profile?.name 
        ? `/profile/${encodeURIComponent(user.profile.name)}`
        : '/profile'
      );
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <AuthActionButton
      onClick={callbacks}
      label={user ? t('menu.logout') : t('menu.login')}
      isLoggedIn={!!user}
      username={user?.profile?.name || user?.email}
    />
  );
}

export default memo(AuthButton);