import React, { useCallback, memo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const AuthBtn = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const cn = bem("AuthBtn");

  const select = useSelector((state) => ({
    username: state.auth.username,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout();
      navigate("/");
    }, [store, navigate]),
    redirectToLoginPage: useCallback(
      () => navigate("/login", { state: { from: location.pathname } }),
      []
    ),
  };

  // function redirectToLoginPage() {
  //   navigate("/login");
  // }

  return (
    <div className={cn()}>
      {select.username ? (
        <div className={cn("auth")}>
          <Link to={"/profile"} className={cn("name")}>
            {select?.username?.profile?.name}
          </Link>
          <button type="button" onClick={callbacks.onLogout}>
            {t("logout")}
          </button>
        </div>
      ) : (
        <button type="button" onClick={callbacks.redirectToLoginPage}>
          {t("login.title")}
        </button>
      )}
    </div>
  );
};

export default memo(AuthBtn);
