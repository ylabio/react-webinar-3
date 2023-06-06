import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthPanel from "../../components/auth-panel";
import useTranslate from "../../hooks/use-translate";


function AuthPanelControl() {


  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.authentication.user,
    isAuth: state.authentication.isAuth
  }))

  console.log(select.isAuth);

  const callbacks = {
    onNavigateLogin: useCallback(() => navigate("/login"), []),
    onLogout: useCallback(() => store.actions.authentication.signOut(), []),
  }
  return (
    <>
      { 
        select.isAuth 
        ?
        <AuthPanel 
          onLogout={callbacks.onLogout}
          user={select.user}
          t={t}
        /> 
        :
        <button onClick={callbacks.onNavigateLogin}>{t('auth.login')}</button>
      }
    </>
  )
}

export default React.memo(AuthPanelControl);