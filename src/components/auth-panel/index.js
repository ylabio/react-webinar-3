import React, { useCallback, memo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate, Link } from 'react-router-dom';
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from '@bem-react/classname';
import './style.css';

const AuthPanel = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const cn = bem('AuthPanel');

  const select = useSelector(state => ({
    user: state.auth.user 
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  function navigateToLoginPage() {
    navigate('/login');
  }

  return (
    <div className={cn()}>
      {select.user ? (
        <div className={cn('authorized')}>
          <Link to={'/profile'} className={cn('name')}>{select?.user?.profile?.name}</Link>
          <button type='button' onClick={callbacks.onLogout}>{t('logout')}</button>
        </div>
      ) : (
        <button type='button' onClick={navigateToLoginPage}>{t('login')}</button>
      )}
    </div>
  );
};

export default memo(AuthPanel);
