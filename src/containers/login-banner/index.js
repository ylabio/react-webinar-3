import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import LoginControls from "../../components/login-controls";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginBanner() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    loggedIn: state.user.loggedIn,
    userId: state.user.userInfo._id,
    userName: state.user.userInfo.profile?.name
  }));

  const callbacks = {
    onLogin: useCallback(() => {
      navigate("/login");
    }, [store]),
    onLogout: useCallback(() => {
      store.actions.user.logout()
      navigate('/')
    }, [store]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout side="end">
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
