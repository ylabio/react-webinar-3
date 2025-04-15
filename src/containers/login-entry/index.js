import { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
// import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import './style.css';
import LoginMenu from '../../components/login-menu';

function LoginEntry() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
    autenticated: state.user.autenticated,
  }));

  useInit(() => {
    store.actions.user.checkAuth();
  }, []);

  useEffect(() => {
    if (select.autenticated) {
      store.actions.user.load();
    }
  }, [select.autenticated, store]);

  const callbacks = {
    // Выход из системы
    signOut: useCallback(() => store.actions.user.signOut(), [store]),
  }

  // const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <LoginMenu user={select.user} onSignOut={callbacks.signOut} />
    </Spinner>
  );
}

export default memo(LoginEntry);
