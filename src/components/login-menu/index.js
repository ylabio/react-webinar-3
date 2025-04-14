import { memo, useCallback } from 'react';
import SideLayout from '../side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function LoginMenu() {
  const { t } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    name: state.session.name,
    successfully: state.session.successfully,
  }));

  const callbacks = {
    onLogIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    onLogOut: useCallback(() => {
      store.actions.session.logOut();
    }, []),
  };

  return (
    <div className="LoginMenu">
      <SideLayout side="end" padding="small">
        {select.successfully ? <Link to="/profile">{select.name}</Link> : ''}
        {select.successfully ? (
          <button onClick={callbacks.onLogOut}>{t('user.logOut')}</button>
        ) : (
          <button onClick={callbacks.onLogIn}>{t('user.logIn')}</button>
        )}
      </SideLayout>
    </div>
  );
}

export default memo(LoginMenu);
