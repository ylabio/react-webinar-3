import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthHeader from '../../components/auth-header';

function AuthHeaderContainer() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
    userName: state.auth.user?.profile?.name || 'Пользователь',
    loading: state.auth.loading,
    initialized: state.auth.initialized,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      return store.actions.auth.logout();
    }, [store]),

    onInitAuth: useCallback(() => {
      return store.actions.auth.init();
    }, [store]),
  };

  return (
    <AuthHeader
      userName={select.userName}
      isAuth={!!select.token}
      loading={select.loading}
      onLogout={callbacks.onLogout}
      onInit={callbacks.onInitAuth}
      initialized={select.initialized}
    />
  );
}

export default memo(AuthHeaderContainer);
