import {memo, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import LoginButton from "../../components/login-button";
import useStore from "../../hooks/use-store";
import LoginUsername from "../../components/login-username";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginPanel() {
  const navigate = useNavigate();
  const store = useStore();
  const cn = bem('LoginPanel');

  const select = useSelector(state => ({
    userInfo: state.profile.userInfo,
    token: state.user.token,
  }));

  const callbacks = {
    navigateToLogin: () => navigate('/login'),
    onSignOut: useCallback(() => {
      store.actions.user.unAuthorize()
      store.actions.profile.clearUserInfo()
    }, [store]),
  }

  return (
    <div className={cn()}>
      <LoginUsername username={select.userInfo?.username}/>
      <LoginButton token={select.token} onSignIn={callbacks.navigateToLogin} onSignOut={callbacks.onSignOut}/>
    </div>
  );
}

export default memo(LoginPanel);
