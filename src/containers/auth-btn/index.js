import React, { useCallback, memo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate, Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Controls from "../../components/controls";

const AuthBtn = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector((state) => ({
    username: state.auth.username,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout();
      navigate("/");
    }, [store, navigate]),
  };

  function redirectToLoginPage() {
    navigate("/login", { state: { from: location.pathname } });
  }

  return (
    <div>
      <Controls
        labelLogout={t("login.logout")}
        labelLogin={t("login.login")}
        clickLogin={redirectToLoginPage}
        clickLogout={callbacks.onLogout}
        username={select?.username}
        link="/profile"
      />
    </div>
  );
};

export default memo(AuthBtn);
