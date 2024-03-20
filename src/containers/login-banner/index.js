import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import LoginControls from "../../components/login-controls";
import { Link, useLocation, useNavigate } from "react-router-dom";

function LoginBanner() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    loggedIn: state.user.loggedIn,
    userId: state.user.userInfo._id,
    userName: state.user.userInfo.profile?.name
  }));

  const getCurrentPath = () => {
    return `${window.location.pathname}${window.location.search}`
  }

  const callbacks = {
    onLogin: useCallback(() => {
      navigate("/login", { state: { redirectTo: getCurrentPath() } });
    }, [store]),
    onLogout: useCallback(() => {
      store.actions.user.logout()
      navigate('/')
    }, [store]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout side="end" border={"bottom"}>
      <LoginControls
        isLoggedIn={select.loggedIn}
        onLogin={callbacks.onLogin}
        onLogout={callbacks.onLogout}
        profileLink={<Link to={`/profile`}>{select.userName}</Link>}
        t={t}
      />
    </SideLayout>
  );
}

export default memo(LoginBanner);
