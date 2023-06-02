import {memo, useCallback} from "react";
import AuthTool from "../../components/auth-tool";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";


function Auth() {
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    userName: state.auth.userName,
    isAuth: state.auth.isAuth,
  }))

  const callbacks = {
    onLogin: useCallback(() => {
      navigate('/login');
    }, []),
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [])
  }

  return (
    <AuthTool
      isAuth={select.isAuth}
      userName={select.userName}
      profilePath={'/profile'}
      onLogin={callbacks.onLogin}
      onLogout={callbacks.onLogout}
      loginTitle={'Вход'}
      logoutTitle={'Выход'}
    />
  )
}

export default memo(Auth)
