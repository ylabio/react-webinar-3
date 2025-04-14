import { memo, useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import TopBarControl from '../../components/top-bar-control';
import { useLocation } from 'react-router-dom';

function TopBar() {
  const store = useStore();
  const { pathname } = useLocation();

  const select = useSelector(state => ({
    name: state.auth.user?.profile?.name || '',
    token: state.auth.token,
  }));

  const callbacks = {
    logoutHandler: useCallback(() => {
      store.actions.auth.logout();
    }, []),
  };

  const { t } = useTranslate();

  return (
    <TopBarControl
      logout={callbacks.logoutHandler}
      name={select.name}
      token={select.token}
      t={t}
      pathname={pathname}
    />
  );
}

export default memo(TopBar);
