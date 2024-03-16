import { memo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginContainer from "../../components/login-container";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function LoginControl() {
  const store = useStore();
  const navigate = useNavigate();
  const callbacks = {
    openLoginPage: useCallback(() => navigate("/login"), []),
    onLogout: useCallback(() => store.actions.auth.logout(), []),
  };

  useEffect(() => {
    async function checkLogin() {
      await store.actions.auth.checkLogin();
    }
    checkLogin();
  }, []);

  const select = useSelector((state) => ({
    isLogin: state.auth.isLogin,
    name: state.auth.user.name,
  }));

  return (
    <>
      <LoginContainer>
        {select.isLogin && <Link to="/profile">{select.name}</Link>}
        {!select.isLogin && (
          <button onClick={callbacks.openLoginPage}>Вход</button>
        )}
        {select.isLogin && <button onClick={callbacks.onLogout}>Выход</button>}
      </LoginContainer>
    </>
  );
}

export default memo(LoginControl);
