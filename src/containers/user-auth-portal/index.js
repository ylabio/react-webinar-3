import React, { memo, useCallback } from "react";
import "./style.css";
// import useAuth from "../../hooks/use-auth";
import UserPortal from "../../components/user-portal";
import UserLoggedIn from "../../components/user-logged-in";
import { useLocation, useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function UserAuthPortal() {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    user: state.user,
  }));
  const { t } = useTranslate();
  const { pathname } = useLocation();
  const callbacks = {
    signIn: useCallback(() => {
      navigate("/login", { state: { from: pathname } });
    }, [store]),
    signOut: useCallback(() => {
      store.actions.user.signOut();
    }, [store]),
  };
  return (
    <UserPortal>
      <Spinner active={select.user.waiting}>
        {select.user.data ? (
          <UserLoggedIn
            link={"/profile"}
            textBtn={t("button.exit")}
            linkTitle={select.user.data.profile.name}
            action={callbacks.signOut}
          />
        ) : (
          <button onClick={callbacks.signIn}>{t("button.signIn")}</button>
        )}
      </Spinner>
    </UserPortal>
  );
}

export default memo(UserAuthPortal);
