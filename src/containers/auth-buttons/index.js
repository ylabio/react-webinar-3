import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import LoginButtons from '../../components/login-buttons';
import {useNavigate} from 'react-router-dom';

function AuthButtons() {

  const store = useStore();

  const select = useSelector(state => ({
    userData: state.login.userData,
    error: state.login.error,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.login.logout(), []),
  }

  const navigate = useNavigate();

  const logout = (event) => {
    event.stopPropagation();
    callbacks.onLogout();
    if (window.location.href.includes('profile')) {
      navigate('/login');
    }
  }

  const {t} = useTranslate();

  return (
    <>
      <LoginButtons loginTitle={t('auth.login')} logoutTitle={t('auth.logout')} userData={select.userData} loginLink={'/login'} profileLink={'/profile'} onLogout={logout}></LoginButtons>
    </>
  )
}

export default memo(AuthButtons);