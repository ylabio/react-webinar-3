import { cn as bem } from '@bem-react/classname';
import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthNavigationLayout from '../../components/auth-navigation-layout';
import Menu from '../../components/menu';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function AuthNavigation() {
  const store = useStore();
  const location = useLocation();

  const user = useSelector(state => state.auth.user);

  const callbacks = {
    // Выход
    onSignOut: useCallback(() => store.actions.auth.signOut(), [store]),
  };

  const { t } = useTranslate();

  const renders = {
    linkProfile: useCallback(() => <Link to="/profile">{user.profile.name}</Link>, [user]),

    linkLogin: useCallback(
      () => (
        <Link to="/login" state={{ from: location }}>
          <button>{t('auth.signIn')}</button>
        </Link>
      ),
      [t, location],
    ),

    buttonSignOut: useCallback(
      () => <button onClick={callbacks.onSignOut}>{t('auth.signOut')}</button>,
      [callbacks.onSignOut, t],
    ),
  };

  const options = useMemo(() => {
    if (user) {
      return [
        { key: 1, renderItem: renders.linkProfile },
        {
          key: 2,
          renderItem: renders.buttonSignOut,
        },
      ];
    } else {
      return [
        {
          key: 1,
          renderItem: renders.linkLogin,
        },
      ];
    }
  }, [user, t, callbacks.onSignOut]);

  const cn = bem('AuthNavigation');

  return (
    <AuthNavigationLayout>
      <Menu items={options} />
    </AuthNavigationLayout>
  );
}

export default memo(AuthNavigation);
