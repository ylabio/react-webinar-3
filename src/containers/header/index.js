import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import LoginBtn from '../../components/login-btn';
import HeaderNav from '../../components/header-nav';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';

function Header() {
  const { t } = useTranslate();
  const store = useStore();
  const callbacks = {
    onLogOut: () => store.actions.user.logOut(),
  };
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    username: state.user.username,
    waiting: state.user.waiting,
  }));

  return (
    <header>
      {select.isAuth ? (
        <Spinner active={select.waiting}>
          <HeaderNav
            username={select.username}
            link='/profile'
            btnLabel={t('btnLogout')}
            onLogOut={callbacks.onLogOut}
          />
        </Spinner>
      ) : (
        <LoginBtn link='/login' btnLogin={t('btnLogin')} />
      )}
    </header>
  );
}

export default memo(Header);
