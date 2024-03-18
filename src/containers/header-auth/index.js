import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import AuthMenu from '../../components/auth-menu';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
const HeaderAuth = () => {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    userInfo: state.user.data,
  }))
  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout()),
  };

  return (
    <>
      {!select.isAuth ? 
      <AuthMenu isAuth={select.isAuth}/> : 
      <AuthMenu isAuth={select.isAuth} onLogout={callbacks.onLogout}>
        <Link to='/profile'>{select.userInfo.profile.name}</Link>
      </AuthMenu>}
    </>
  );
};

export default HeaderAuth;
