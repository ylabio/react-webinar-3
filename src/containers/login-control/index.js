import { memo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginContainer from "../../components/login-container";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";

function LoginControl() {
  const store = useStore();
  const navigate = useNavigate();
  const callbacks = {
    openLoginPage: useCallback(() => navigate("/login"), []),
    onLogout: useCallback(() => store.actions.auth.logout(), []),
  };
  const { t } = useTranslate();

  useInit(() => {
    store.actions.auth.checkLogin();
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
          <button onClick={callbacks.openLoginPage}>{t("login")}</button>
        )}
        {select.isLogin && (
          <button onClick={callbacks.onLogout}>{t("logout")}</button>
        )}
      </LoginContainer>
    </>
  );
}

export default memo(LoginControl);
