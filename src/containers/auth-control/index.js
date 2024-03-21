import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthTool from "../../components/auth-tool";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const AuthControl = () => {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    token: state.session.token,
    user: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const callbacks = {
    onLogin: useCallback(() => navigate("/login"), [store]),
    onLogout: useCallback(() => store.actions.session.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout side="end" padding="small" borderBottom={true}>
      <AuthTool
        text={select.token ? t("auth.logout") : t("auth.signin")}
        name={
          select.token && select?.user?.profile?.name
            ? select.user.profile.name
            : null
        }
        onClick={select.token ? callbacks.onLogout : callbacks.onLogin}
      />
    </SideLayout>
  );
};

export default AuthControl;
