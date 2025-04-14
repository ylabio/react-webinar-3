import { memo, useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import TopBarControl from '../../components/top-bar-control';

function TopBar() {
  const store = useStore();

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
    <TopBarControl logout={callbacks.logoutHandler} name={select.name} token={select.token} t={t} />
  );
}

export default memo(TopBar);
